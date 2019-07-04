const commando = require('discord.js-commando')

class UserSignUp extends commando.Command{
  constructor(client){
    super(client, {
      name: 'tank',
      group: 'events',
      memberName: '+',
      description: 'Allows users to sign up as tank'
    })
  }

  async run(message){
    const userId = message.author.id
    // const userName = message.author.username
    message.channel.send(`<@${userId}>, you have been added as a tank`)
    message.channel.send('!event 5d1dc4f1ec9dbb0bb5e39d4c')


  }
}

module.exports = UserSignUp
