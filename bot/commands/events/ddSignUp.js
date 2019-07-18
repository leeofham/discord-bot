const commando = require('discord.js-commando')
const { RichEmbed } = require('discord.js')
const moment = require('moment')
const axios = require('axios')

class DDSignUp extends commando.Command{
  constructor(client){
    super(client, {
      name: 'dd',
      group: 'events',
      memberName: 'dd',
      description: 'Allows users to sign up as dd, type !dd eventId'
    })
  }

  async run(message, args){
    const argsArray = args.split(', ')
    const userId = argsArray[1] || message.author.id

    axios.get(`http://localhost:4000/events/${argsArray[0]}`)
      .then(function signUpDD(res){
        if(message.channel.id === res.data.channel){
          if(!res.data){
            message.channel.send(`${argsArray[0]} isn't a valid ID`)
          }

          const data = res.data
          const tanks = res.data.tanks
          const healers = res.data.healers
          const dds = res.data.dds
          const tankEmbed = []
          const healerEmbed = []
          const ddsEmbed = []

          if(tanks.indexOf(userId) && healers.indexOf(userId) && dds.indexOf(userId) === -1){
            const index = dds.indexOf('Empty')
            if(index !== -1){
              dds[index] = userId
              message.channel.send(`<@${userId}>, you have been added as a dd`)
            } else {
              message.channel.send(`<@${userId}> You are already signed up!` )
            }
            axios.put(`http://localhost:4000/events/${argsArray[0]}`, {
              dds: dds
            })
          } else {
            message.channel.send(`<@${userId}> You are already signed up!`)
          }

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

          message.channel.send(roster)
        } else{
          message.channel.send('You cannot sign up for this event from this channel! Please use the correct channel!')
        }
      })
  }
}

module.exports = DDSignUp
