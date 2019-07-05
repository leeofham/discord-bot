const commando = require('discord.js-commando')
const axios = require('axios')

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
        const tanks = res.data.tanks
        const healers = res.data.healers
        const dds = res.data.dds
        if(tanks.indexOf(userId) && healers.indexOf(userId) && dds.indexOf(userId) === -1){
          const index = tanks.indexOf('Empty')
          if(index !== -1){
            tanks[index] = userId
            message.channel.send(`<@${userId}>, you have been added as a tank`)
          } else {
            message.channel.send('There are no tanks spots left')
          }
          axios.put(`http://localhost:4000/events/${args}`, {
            tanks: tanks
          })
        } else {
          message.channel.send(`<@${userId}> You are already signed up!`)
        }
      })
  }
}

module.exports = TankSignUp
