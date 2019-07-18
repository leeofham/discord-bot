const commando = require('discord.js-commando')
const axios = require('axios')

class roleLimits extends commando.Command{
  constructor(client){
    super(client, {
      name: 'limit',
      group: 'admin',
      memberName: 'limit',
      description: '(Admins Only) Allows user to change number of roles allowed to sign up for an event. For example 3 tanks for vCR. Use {!limit eventId tanks/healers/dds, 3} to change sign ups of a role to 3',
      userPermissions: ['ADMINISTRATOR']
    })
  }
  // !limit tanks, 4
  async run(message, args){
    const argsArray = args.split(', ')
    const role = argsArray[1]
    const numberOfSignups = parseInt(argsArray[2])
    const emptyArray = []
    for(let i = 0; i < numberOfSignups; i++){
      emptyArray.push('Empty')
    }
    axios.put(`http://localhost:4000/events/${argsArray[0]}`, {
      [role]: emptyArray
    })
    message.channel.send(`The event has had the number of ${role} changed. Please sign up everyone who was signed up before the change`)
  }
}

module.exports = roleLimits
