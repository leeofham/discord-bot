const commando = require('discord.js-commando')
const axios = require('axios')
const moment = require('moment')
const { RichEmbed } = require('discord.js')

class TankSignUp extends commando.Command{
  constructor(client){
    super(client, {
      name: 'tank',
      group: 'events',
      memberName: 'tank',
      description: 'Allows users to sign up as tank, type: !tank eventId'
    })
  }

  async run(message, args){
    const userId = message.author.id

    axios.get(`http://localhost:4000/events/${args}`)

      .then(function signUpDD(res){
        const data = res.data
        const tanks = res.data.tanks
        const healers = res.data.healers
        const dds = res.data.dds
        if(tanks.indexOf(userId) && healers.indexOf(userId) && dds.indexOf(userId) === -1){
          const index = tanks.indexOf('Empty')
          if(index !== -1){
            tanks[index] = userId
            message.channel.send(`<@${userId}> You have been added as a tank`)
          } else {
            message.channel.send(`<@${userId}> There are no tanks spots left`)
          }
          axios.put(`http://localhost:4000/events/${args}`, {
            tanks: tanks
          })
        } else {
          message.channel.send(`<@${userId}> You are already signed up!`)
        }
        const roster = new RichEmbed()
          .setColor('#0099ff')
          .setTitle(`${data.name}`)
          .setAuthor('Bears Bot', 'https://pixel.nymag.com/imgs/daily/vulture/2017/11/08/08-terry-crews.w330.h330.jpg')
          .setDescription(`${moment(data.date).local().format('DD MMMM YYYY hh:mm a')} (your local time)`)
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

module.exports = TankSignUp
