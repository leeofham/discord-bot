const commando = require('discord.js-commando')

class Purge extends commando.Command{
  constructor(client){
    super(client, {
      name: 'purge',
      group: 'admin',
      memberName: 'purge',
      description: '(Admins Only) Clears messages from channel it is called in. Use !purge number or all to clear last 100 messages',
      userPermissions: ['ADMINISTRATOR']
    })
  }

  async run(message, args){

    if(message.channel.type === 'dm'){
      message.channel.send('This function is only for text channels not DMs!')
      return
    }

    if(args !== 'all' && isNaN(args)){
      message.channel.send('Please provide a number or all')
      return
    }

    const total = parseInt(args)

    if(args === 'all'){
      message.delete()
      message.channel.bulkDelete(100)
        .catch(error => message.channel.send(`Error: ${error}`))
    } else {
      message.delete()
      message.channel.bulkDelete(total)
        .catch(error => message.channel.send(`Error: ${error}`))
    }
  }
}

module.exports = Purge
