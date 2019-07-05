const commando = require('discord.js-commando')
const axios = require('axios')

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
    const userId = message.author.id

    axios.get(`http://localhost:4000/events/${args}`)

      .then(function signUpDD(res){
        const tanks = res.data.tanks
        const healers = res.data.healers
        const dds = res.data.dds
        if(tanks.indexOf(userId) && healers.indexOf(userId) && dds.indexOf(userId) === -1){
          const index = healers.indexOf('Empty')
          if(index !== -1){
            healers[index] = userId
            message.channel.send(`<@${userId}>, you have been added as a healer`)
          } else {
            message.channel.send('There are no healers spots left')
          }
          axios.put(`http://localhost:4000/events/${args}`, {
            healers: healers
          })
        } else {
          message.channel.send(`<@${userId}> You are already signed up!`)
        }
      })
  }
}

module.exports = HealerSignUp
