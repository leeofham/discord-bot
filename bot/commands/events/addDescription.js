const commando = require('discord.js-commando')
const axios = require('axios')

class AddDescription extends commando.Command{
  constructor(client){
    super(client, {
      name: 'description',
      group: 'events',
      memberName: 'description',
      description: 'Allows user to add description for event'
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
      .catch(function error(){
        message.channel.send('Opps, something went wrong!')
      })
  }
}

module.exports = AddDescription
