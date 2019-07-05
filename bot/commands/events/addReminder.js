const commando = require('discord.js-commando')
const axios = require('axios')

class AddReminder extends commando.Command{
  constructor(client){
    super(client, {
      name: 'reminder',
      group: 'events',
      memberName: 'reminder',
      description: 'Allows user to add reminder for event, type !reminder eventId, "reminder times in seconds, more than one reminder separate with comma ,"',
      userPermissions: ['ADMINISTRATOR']
    })
  }

  async run(message, args){
    const argsArray = args.split(', ')
    const id = argsArray.shift()
    const reminders = argsArray
    axios.put(`http://localhost:4000/events/${id}`, {
      reminder: reminders
    })
      .then(function confirm(res){
        message.channel.send(`You have successfully added the following reminder/s "${res.data.reminder}"`)
      })
      .catch(function error(){
        message.channel.send('Opps, something went wrong!')
      })
  }
}

module.exports = AddReminder
