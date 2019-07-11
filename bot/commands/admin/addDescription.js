const commando = require('discord.js-commando')
const axios = require('axios')

class AddDescription extends commando.Command{
  constructor(client){
    super(client, {
      name: 'description',
      group: 'admin',
      memberName: 'description',
      description: '(Admins Only) Allows user to add description for event, type !description eventId, "whatever the description is"',
      userPermissions: ['ADMINISTRATOR']
    })
  }

  async run(message, args){
    const argsArray = args.split(', ')
    const id = argsArray.shift()
    const description = argsArray.join(', ')
    axios.put(`http://localhost:4000/events/${id}`, {
      description: `${description}`
    })
      .then(function confirm(res){
        message.channel.send(`You have successfully added the description "${res.data.description}"`)
      })
      .catch(error => message.channel.send(`${error}`))
  }
}

module.exports = AddDescription
