const commando = require('discord.js-commando')

class Hello extends commando.Command{
  constructor(client){
    super(client, {
      name: 'hello',
      group: 'developer',
      memberName: 'hello',
      description: 'Says hello back to test bot is working.'
    })
  }

  async run(message){
    message.reply('Why hello there!')
  }
}

module.exports = Hello
