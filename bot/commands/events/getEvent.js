const commando = require('discord.js-commando')
const { RichEmbed } = require('discord.js')
const axios = require('axios')

class getEvent extends commando.Command{
  constructor(client){
    super(client, {
      name: 'event',
      group: 'events',
      memberName: 'event',
      description: 'Gets data from API'
    })
  }

  async run(message, args){
    axios.get(`http://localhost:4000/events/${args}`)
      .then(function reply(res){
        const data = res.data
        const person = res.data.attendees
        const roster = new RichEmbed()
          .setColor('#0099ff')
          .setTitle(`${data.name}`)
          .setAuthor('Bears Bot', 'http://i.imgur.com/FDxfOww.png')
          .setDescription(`${data.date.substring(0,10)} at ${data.startTime}pm CEST`)
          .setThumbnail('http://i.imgur.com/FDxfOww.png')
          .addField(`${data.description}`, '\u200b')
          .addField('Tanks', `${person.tanks[0]}\n${person.tanks[1]}`, true)
          .addField('Healers', `${person.healers[0]}\n${person.healers[1]}`, true)
          .addField('Damage Dealers', `${person.dds[0]}\n${person.dds[1]}\n${person.dds[2]}\n${person.dds[3]}\n${person.dds[4]}\n${person.dds[5]}\n${person.dds[6]}\n${person.dds[7]}`, true)
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
