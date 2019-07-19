const dotenv = require('dotenv')
dotenv.config()

const axios = require('axios')
const moment = require('moment')

const commando = require('discord.js-commando')
const bot = new commando.Client()
const { RichEmbed } = require('discord.js')

bot.registry.registerGroup('random', 'Random')
bot.registry.registerGroup('events', 'Events')
bot.registry.registerGroup('admin', 'Admin')
bot.registry.registerDefaults()
bot.registry.registerCommandsIn(__dirname + '/commands')

bot.on('ready', () =>{
  setInterval(() => {
    let id
    let channel
    axios.get('http://localhost:4000/events/')
      .then(function getDates(res){
        for(let i = 0; i<res.data.length; i++){
          const now = moment().valueOf()
          const difference = res.data[i].date - now

          if(res.data[i].remade === false && difference < 0 ){
            const date = moment(res.data[i].date).add(7, 'days')
            id = date.format('DD.MM.YY')
            channel = res.data[i].channel

            axios.post('http://localhost:4000/events/', {
              name: res.data[i].name,
              date: date.valueOf(),
              startTime: res.data[i].startTime,
              endTime: res.data[i].endTime,
              _id: id,
              channel: channel,
              description: res.data[i].description
            })
              .then(
                axios.put(`http://localhost:4000/events/${res.data[i]._id}`, {
                  remade: true
                })
                  .then(() => clearChannel(channel))
                  .then(() => getEventInfo(id, channel))
              )
          }
        }
      })
      .catch('I dont know why this is happening')
  }, 900000)
})

function clearChannel(channelInfo){
  const channel = bot.channels.find(channel => channel.id === `${channelInfo}`)
  channel.bulkDelete(100)
}

function getEventInfo(id, channelInfo){
  axios.get(`http://localhost:4000/events/${id}`)
    .then(function reply(res){
      if(!res.data){
        console.log(`${id} isn't a valid ID`)
      }

      const data = res.data
      const tanks = res.data.tanks
      const healers = res.data.healers
      const dds = res.data.dds
      const tankEmbed = []
      const healerEmbed = []
      const ddsEmbed = []

      for(let i = 0; i < tanks.length; i++){
        tankEmbed[i] = `\n${i + 1}) <@${tanks[i]}>`
      }
      for(let i = 0; i < healers.length; i++){
        healerEmbed[i] = `\n${i + 1}) <@${healers[i]}>`
      }
      for(let i = 0; i < dds.length; i++){
        ddsEmbed[i] = `\n${i + 1}) <@${dds[i]}>`
      }

      const roster = new RichEmbed()
        .setColor('#0099ff')
        .setTitle(`${data.name}`)
        .setAuthor('Bears Bot', 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NDg0MDYwNjkzMjY3OTgz/terry-crews-headshot-600x600jpg.jpg')
        .setDescription(`${moment(data.date).local().format('dddd DD MMMM YYYY HH:mm a')} (local time)`)
        .setThumbnail('https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NDg0MDYwNjkzMjY3OTgz/terry-crews-headshot-600x600jpg.jpg')
        .addField(`${data.description}`, '\u200b')
        .addField('Tanks', `${tankEmbed}`, true)
        .addField('Healers', `${healerEmbed}`, true)
        .addField('Damage Dealers', `${ddsEmbed}`, true)
        .setTimestamp()
        .setFooter(`id: ${data._id}`)


      const channel = bot.channels.find(channel => channel.id === `${channelInfo}`)
      channel.send(roster)
      channel.send(`Next weeks event has been created, you can start signing up for it here. It's id is ${id}`)
    })
}

bot.login(process.env.DISCORD_TOKEN)
