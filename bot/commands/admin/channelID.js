const commando = require('discord.js-commando')

class ChannelID extends commando.Command{
  constructor(client){
    super(client, {
      name: 'channelid',
      group: 'random',
      memberName: 'channelid',
      description: '(Admins Only) Prints channel ID in the console.',
      userPermissions: ['ADMINISTRATOR']
    })
  }

  async run(message){
    console.log(message.channel.id)
  }
}

module.exports = ChannelID
