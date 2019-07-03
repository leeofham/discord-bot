const commando = require('discord.js-commando')
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

  async run(message){
    axios.get('http://localhost:4000/events/5d1c7f1e491f0506e2bf5bca')
      .then(function reply(res){
        message.channel.send({embed: {
          color: 3447003,
          title: res.data.name,
          description: `${res.data.description},\n ${res.data.date.substring(0,10)}, ${res.data.startTime}`,
          fields: [
            { name: 'Tanks',
              value: `${res.data.attendees.tanks[0]}\n${res.data.attendees.tanks[1]}`, inline: true
            },{ name: 'Healers',
              value: `${res.data.attendees.healers[0]}\n${res.data.attendees.healers[1]}`, inline: true
            },{ name: 'DDs',
              value:
              `${res.data.attendees.dds[0]}
              ${res.data.attendees.dds[1]}
              ${res.data.attendees.dds[2]}
              ${res.data.attendees.dds[3]}
              ${res.data.attendees.dds[4]}
              ${res.data.attendees.dds[5]}
              ${res.data.attendees.dds[6]}
              ${res.data.attendees.dds[7]}`,
              inline: true
            }
          ]
        }
        })
      })
  }
}

module.exports = getEvent
