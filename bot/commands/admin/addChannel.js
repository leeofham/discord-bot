const commando = require('discord.js-commando')
const axios = require('axios')

class AddChannel extends commando.Command{
  constructor(client){
    super(client, {
      name: 'channel',
      group: 'random',
      memberName: 'channel',
      description: '(Admins Only) Add the channel for the messages to be sent to, type !addChannel eventID, channelID',
      userPermissions: ['ADMINISTRATOR']
    })
  }

  async run(message, args){
    const argsArray = args.split(', ')

    const channels = message.guild.channels.filter(channel => channel.type === 'text')
    const channelID = channels.map(channel => channel.id)

    if(channelID.includes(argsArray[1])){
      axios.put(`http://localhost:4000/events/${argsArray[0]}`, {
        channel: argsArray[1]
      })
      message.channel.send(`Added channel ID ${argsArray[1]} to the event`)

    } else {
      message.channel.send('Not a valid command, you may have missed a comma.')
    }
  }
}

module.exports = AddChannel
