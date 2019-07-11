const commando = require('discord.js-commando')
const axios = require('axios')
const moment = require('moment')
const { RichEmbed } = require('discord.js')

class CreateEvent extends commando.Command{
  constructor(client){
    super(client, {
      name: 'create',
      group: 'admin',
      memberName: 'create',
      description: '(Admins Only) Allows users to create event',
      userPermissions: ['ADMINISTRATOR']
    })
  }

  async run(message, args){
    //args name, date yyyy-mm-dd, start time 24h, end time 24hr
    const argsArray = args.split(', ')

    axios.post('http://localhost:4000/events/', {
      name: argsArray[0],
      date: moment(`${argsArray[1]} ${argsArray[2]}`).valueOf(),
      startTime: argsArray[2],
      endTime: argsArray[3],
      _id: moment(argsArray[1]).format('DD.MM')
    })
      .then(function confirm(res){
        axios.get(`http://localhost:4000/events/${res.data._id}`)
          .then(function sendEmbed(res){

            const data = res.data
            const tanks = res.data.tanks
            const healers = res.data.healers
            const dds = res.data.dds

            const event = new RichEmbed()
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

            message.channel.send(event)
          })
      })
      .catch(error => message.channel.send(`${error}`))
  }
}

module.exports = CreateEvent
