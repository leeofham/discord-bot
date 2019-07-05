const commando = require('discord.js-commando')
const axios = require('axios')

class DDSignUp extends commando.Command{
  constructor(client){
    super(client, {
      name: 'dd',
      group: 'events',
      memberName: 'dd',
      description: 'Allows users to sign up as dd, type !dd eventId'
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
          const index = dds.indexOf('Empty')
          if(index !== -1){
            dds[index] = userId
            message.channel.send(`<@${userId}>, you have been added as a dd`)
          } else {
            message.channel.send('There are no dds spots left')
          }
          axios.put(`http://localhost:4000/events/${args}`, {
            dds: dds
          })
        } else {
          message.channel.send(`<@${userId}> You are already signed up!`)
        }
      })
  }
}

module.exports = DDSignUp
