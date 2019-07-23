const commando = require('discord.js-commando')

class Summon extends commando.Command{
  constructor(client){
    super(client, {
      name: 'summon',
      group: 'admin',
      memberName: 'summon',
      description: '(Admins Only) Summons a person a number of times, maximum 10 to stop trolling',
      userPermissions: ['ADMINISTRATOR']
    })
  }

  async run(message, args){
    const argsArray = args.split(', ')

    if(argsArray[1] >= 10) {
      argsArray[1] = 10
      message.channel.send('Too many summons! Only allowed to summon them 10 times!')
      for(let i = 1; i <= argsArray[1]; i++){
        message.channel.send(`<@${argsArray[0]}>`)
      }
    } else {
      for(let i = 1; i <= argsArray[1]; i++){
        message.channel.send(`<@${argsArray[0]}>`)
      }
    }
  }
}

module.exports = Summon
