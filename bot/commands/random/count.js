const commando = require('discord.js-commando')

class Math extends commando.Command{
  constructor(client){
    super(client, {
      name: 'count',
      group: 'random',
      memberName: 'count',
      description: 'Counts up to number given as argument, used for testing purge',
      userPermissions: ['ADMINISTRATOR']
    })
  }

  async run(message, args){
    for(let i = 1; i <= args; i++){
      message.channel.send(`${i}`)
    }
  }
}

module.exports = Math
