const commando = require('discord.js-commando')
const axios = require('axios')
const moment = require('moment')
const { RichEmbed } = require('discord.js')

class HealerSignUp extends commando.Command{
  constructor(client){
    super(client, {
      name: 'healer',
      group: 'events',
      memberName: 'healer',
      description: 'Allows users to sign up as healer, type: !healer eventId'
    })
  }

  async run(message, args){
    const argsArray = args.split(', ')
    const userId = argsArray[1] || message.author.id

    axios.get(`http://localhost:4000/events/${argsArray[0]}`)
      .then(function signUpDD(res){
        if(message.channel.id === res.data.channel){
          if(!res.data){
            message.channel.send(`${args} isn't a valid ID`)
          }

          const data = res.data
          const tanks = res.data.tanks
          const healers = res.data.healers
          const dds = res.data.dds
          if(tanks.indexOf(userId) && healers.indexOf(userId) && dds.indexOf(userId) === -1){
            const index = healers.indexOf('Empty')
            if(index !== -1){
              healers[index] = userId
              message.channel.send(`<@${userId}>, you have been added as a healer`)
            } else {
              message.channel.send(`<@${userId}> You are already signed up!`)
            }
            axios.put(`http://localhost:4000/events/${argsArray[0]}`, {
              healers: healers
            })
          } else {
            message.channel.send(`<@${userId}> You are already signed up!`)
          }
          const roster = new RichEmbed()
            .setColor('#0099ff')
            .setTitle(`${data.name}`)
            .setAuthor('Bears Bot', 'https://pixel.nymag.com/imgs/daily/vulture/2017/11/08/08-terry-crews.w330.h330.jpg')
            .setDescription(`${moment(data.date).local().format('dddd DD MMMM YYYY HH:mm a')} (local time)`)
            .setThumbnail('https://pixel.nymag.com/imgs/daily/vulture/2017/11/08/08-terry-crews.w330.h330.jpg')
            .addField(`${data.description}`, '\u200b')
            .addField('Tanks', `1) <@${tanks[0]}>\n2) <@${tanks[1]}>`, true)
            .addField('Healers', `1) <@${healers[0]}>\n2) <@${healers[1]}`, true)
            .addField('Damage Dealers', `1) <@${dds[0]}>\n2) <@${dds[1]}>\n3) <@${dds[2]}>\n4) <@${dds[3]}>\n5) <@${dds[4]}>\n6) <@${dds[5]}>\n7) <@${dds[6]}>\n8) <@${dds[7]}>`, true)
            .setTimestamp()
            .setFooter(`id: ${data._id}`)

          message.channel.send(roster)
        } else{
          message.channel.send('You cannot sign up for this event from this channel! Please use the correct channel!')
        }
      })
  }
}

module.exports = HealerSignUp
