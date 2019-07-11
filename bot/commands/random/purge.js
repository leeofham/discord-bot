const commando = require('discord.js-commando')

class Purge extends commando.Command{
  constructor(client){
    super(client, {
      name: 'purge',
      group: 'random',
      memberName: 'purge',
      description: 'Clears messages from channel it is called in. Admins only',
      userPermissions: ['ADMINISTRATOR']
    })
  }

  async run(message, args){
    if(isNaN(args)){
      message.channel.send('Please provide a number')
      return
    }
    if(args !== 'all'){
      message.delete()
      message.channel.bulkDelete(args)
        .catch(error => message.channel.send(`Error: ${error}`))
    }
  }
}

module.exports = Purge
