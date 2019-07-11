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
      description: 'Allows users to sign off raid. !signoff eventId'
    })
  }

  async run(message, args){
    const argsArray = args.split(', ')
    const userId = argsArray[1] || message.author.id

    // get arrays, search arrays, find index of user id and change it to 'Empty'

    axios.get(`http://localhost:4000/events/${argsArray[0]}`)

      .then(function signoff(res){

        if(!res.data){
          message.channel.send(`${args} isn't a valid ID`)
        }
        
        const data = res.data
        const tanks = res.data.tanks
        const healers = res.data.healers
        const dds = res.data.dds
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
      })
  }
}

module.exports = Signoff
