const commando = require('discord.js-commando')
const axios = require('axios')
const { RichEmbed } = require('discord.js')
const moment = require('moment')

class Signoff extends commando.Command{
  constructor(client){
    super(client, {
      name: 'signoff',
      group: 'events',
      memberName: 'signoff',
      description: 'Allows users to sign off raid. Admin can signoff anyone, Users can only sign themselves off. !signoff eventId'
    })
  }

  async run(message, args){
    const argsArray = args.split(', ')
    let userId

    if (message.member.hasPermission('ADMINISTRATOR')){
      userId = argsArray[1] || message.author.id
    } else {
      if(argsArray[1]){
        message.channel.send('Only admins can sign up others.')
        return
      } else {
        userId = message.author.id
      }
    }

    axios.get(`http://localhost:4000/events/${argsArray[0]}`)
      .then(function signoff(res){

        if(!res.data){
          message.channel.send(`${args} isn't a valid ID`)
        } else if(message.channel.id === res.data.channel){

          const data = res.data
          const tanks = res.data.tanks
          const healers = res.data.healers
          const dds = res.data.dds
          const tankEmbed = []
          const healerEmbed = []
          const ddsEmbed = []

          if(tanks.indexOf(userId) !== -1){
            const tankIndex = tanks.indexOf(userId)
            if(tankIndex !== -1){
              tanks[tankIndex] = 'Empty'
              axios.put(`http://localhost:4000/events/${argsArray[0]}`, {
                tanks: tanks
              })
              message.channel.send(`<@${userId}>, you are no longer signed up as a tank`)
            }
          } else if(healers.indexOf(userId) !== -1){
            const healerIndex = healers.indexOf(userId)
            if(healerIndex !== -1){
              healers[healerIndex] = 'Empty'
              axios.put(`http://localhost:4000/events/${argsArray[0]}`, {
                healers: healers
              })
              message.channel.send(`<@${userId}>, you are no longer signed up as a healer`)
            }
          } else if(dds.indexOf(userId) !== -1){
            const ddIndex = dds.indexOf(userId)
            if(ddIndex !== -1){
              dds[ddIndex] = 'Empty'
              axios.put(`http://localhost:4000/events/${argsArray[0]}`, {
                dds: dds
              })
              message.channel.send(`<@${userId}>, you are no longer signed up as a dd`)
            }
          } else {
            message.channel.send(`<@${userId}>, you are not signed up for this event`)
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
        } else {
          message.channel.send('You cannot sign off from this channel! Please use the correct channel!')
        }
      })
  }
}

module.exports = Signoff
