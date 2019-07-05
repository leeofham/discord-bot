const commando = require('discord.js-commando')
const axios = require('axios')
const moment = require('moment')

class CreateEvent extends commando.Command{
  constructor(client){
    super(client, {
      name: 'create',
      group: 'events',
      memberName: 'create',
      description: 'Allows users to create event, type !create name, yyyy-mm-dd, startTime(24hr clock), endTime(24hr clock)'
    })
  }

  async run(message, args){
    //args name, date yyyy-mm-dd, start time 24h, end time 24hr
    const argsArray = args.split(',')

    axios.post('http://localhost:4000/events/', {
      name: argsArray[0],
      date: moment.utc(argsArray[1]),
      startTime: argsArray[2],
      endTime: argsArray[3]
    })
      .then(function confirm(res){
        message.channel.send(`You have successfully created an event. Its ID is ${res.data._id}`)
      })
      .catch(function error(){
        message.channel.send('Opps, something went wrong!')
      })
  }
}

module.exports = CreateEvent
