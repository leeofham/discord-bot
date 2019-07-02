const commando = require('discord.js-commando')

class Hello extends commando.Command{
  constructor(client){
    super(client, {
      name: 'hello',
      group: 'random',
      memberName: 'hello',
      description: 'Says hello back'
    })
  }

  async run(message){
    message.reply('Why hello there')
  }
}

module.exports = Hello
