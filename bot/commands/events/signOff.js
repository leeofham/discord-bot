const commando = require('discord.js-commando')
const axios = require('axios')

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
    const userId = message.author.id

    // get arrays, search arrays, find index of user id and change it to 'Empty'

    axios.get(`http://localhost:4000/events/${args}`)

      .then(function signoff(res){
        const tanks = res.data.tanks
        const healers = res.data.healers
        const dds = res.data.dds
        if(tanks.indexOf(userId) !== -1){
          const tankIndex = tanks.indexOf(userId)
          if(tankIndex !== -1){
            tanks[tankIndex] = 'Empty'
            axios.put(`http://localhost:4000/events/${args}`, {
              tanks: tanks
            })
            message.channel.send(`<@${userId}>, you are no longer signed up as a tank`)
          }
        } else if(healers.indexOf(userId) !== -1){
          const healerIndex = healers.indexOf(userId)
          if(healerIndex !== -1){
            healers[healerIndex] = 'Empty'
            axios.put(`http://localhost:4000/events/${args}`, {
              healers: healers
            })
            message.channel.send(`<@${userId}>, you are no longer signed up as a healer`)
          }
        } else if(dds.indexOf(userId) !== -1){
          const ddIndex = dds.indexOf(userId)
          if(ddIndex !== -1){
            dds[ddIndex] = 'Empty'
            axios.put(`http://localhost:4000/events/${args}`, {
              dds: dds
            })
            message.channel.send(`<@${userId}>, you are no longer signed up as a dd`)
          }
        } else {
          message.channel.send(`<@${userId}>, you are not signed up for this event`)
        }
      })
  }
}

module.exports = Signoff
