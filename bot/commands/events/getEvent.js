const commando = require('discord.js-commando')
const { RichEmbed } = require('discord.js')
const axios = require('axios')

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
    axios.get(`http://localhost:4000/events/${args}`)
      .then(function reply(res){
        const data = res.data
        const tanks = res.data.tanks
        const healers = res.data.healers
        const dds = res.data.dds

        const roster = new RichEmbed()
          .setColor('#0099ff')
          .setTitle(`${data.name}`)
          .setAuthor('Bears Bot', 'https://pixel.nymag.com/imgs/daily/vulture/2017/11/08/08-terry-crews.w330.h330.jpg')
          .setDescription(`${data.date.substring(0,10)} at ${data.startTime}pm CEST`)
          .setThumbnail('https://pixel.nymag.com/imgs/daily/vulture/2017/11/08/08-terry-crews.w330.h330.jpg')
          .addField(`${data.description}`, '\u200b')
          .addField('Tanks', `1) <@${tanks[0]}>\n2) <@${tanks[1]}>`, true)
          .addField('Healers', `1) <@${healers[0]}>\n2) <@${healers[1]}`, true)
          .addField('Damage Dealers', `1) <@${dds[0]}>\n2) <@${dds[1]}>\n3) <@${dds[2]}>\n4) <@${dds[3]}>\n5) <@${dds[4]}>\n6) <@${dds[5]}>\n7) <@${dds[6]}>\n8) <@${dds[7]}>`, true)
          .setTimestamp()
          .setFooter(`id: ${data._id}`)

        message.channel.send(roster)
      })
      .catch(function error(){
        message.channel.send('ERROR!! Abbs is gay, blame her for breaking me!')
      })
  }
}

module.exports = getEvent
