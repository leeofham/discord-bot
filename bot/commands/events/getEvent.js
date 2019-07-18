const commando = require('discord.js-commando')
const { RichEmbed } = require('discord.js')
const axios = require('axios')
const moment = require('moment')

class getEvent extends commando.Command{
  constructor(client){
    super(client, {
      name: 'event',
      group: 'events',
      memberName: 'event',
      description: 'Gets event data from API, type !event eventId'
    })
  }

  async run(message, args){
    if(message.content.includes('!event')){
      axios.get(`http://localhost:4000/events/${args}`)
        .then(function reply(res){
          if(message.channel.id === res.data.channel){
            if(!res.data){
              message.channel.send(`${args} isn't a valid ID`)
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
              .setAuthor('Bears Bot', 'https://pixel.nymag.com/imgs/daily/vulture/2017/11/08/08-terry-crews.w330.h330.jpg')
              .setDescription(`${moment(data.date).local().format('dddd DD MMMM YYYY HH:mm a')} (local time)`)
              .setThumbnail('https://pixel.nymag.com/imgs/daily/vulture/2017/11/08/08-terry-crews.w330.h330.jpg')
              .addField(`${data.description}`, '\u200b')
              .addField('Tanks', `${tankEmbed}`, true)
              .addField('Healers', `${healerEmbed}`, true)
              .addField('Damage Dealers', `${ddsEmbed}`, true)
              .setTimestamp()
              .setFooter(`id: ${data._id}`)

            message.channel.send(roster)
          } else{
            message.channel.send('You cannot get this events info from this channel! Please use the correct channel!')
          }
        })
        .catch(function error(){
          message.channel.send('ERROR!! Wrong ID number!')
        })
    }
  }
}

module.exports = getEvent
