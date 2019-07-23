const commando = require('discord.js-commando')
const axios = require('axios')
const moment = require('moment')

class Edit extends commando.Command{
  constructor(client){
    super(client, {
      name: 'edit',
      group: 'admin',
      memberName: 'edit',
      description: '(Admins Only) Allows user to edit field of event. Bare in mind if you change the date the ID remains the same, for instance to change name type !edit eventID, name, newNameValue',
      userPermissions: ['ADMINISTRATOR']
    })
  }

  async run(message, args){
    const argsArray = args.split(', ')

    if(argsArray[1] === 'date'){

      axios.get(`http://localhost:4000/events/${argsArray[0]}`)
        .then(function setDate(res){
          const dateMs = moment(`${argsArray[2]} ${res.data.startTime}`).valueOf()
          axios.put(`http://localhost:4000/events/${argsArray[0]}`, {
            [argsArray[1]]: dateMs
          })
        })

        .then(function confirm(){
          message.channel.send(`You have successfully changed the ${argsArray[1]}.`)
        })
        .catch(() => message.channel.send(`${argsArray[1]} is not a field`))

    }else if(argsArray[1] === 'startTime'){

      axios.get(`http://localhost:4000/events/${argsArray[0]}`)
        .then(function setDate(res){
          const date = moment(res.data.date).local().format('YYYY-MM-DD')
          const dateMs = moment(`${date} ${argsArray[2]}`).valueOf()

          axios.put(`http://localhost:4000/events/${argsArray[0]}`, {
            [argsArray[1]]: argsArray[2],
            date: dateMs
          })
            .then(function confirm(){
              message.channel.send(`You have successfully changed the ${argsArray[1]}.`)
            })
            .catch(() => message.channel.send(`${argsArray[1]} is not a field`))
        })


    }else{
      axios.put(`http://localhost:4000/events/${argsArray[0]}`, {
        [argsArray[1]]: argsArray[2]
      })
        .then(function confirm(){
          message.channel.send(`You have successfully changed the ${argsArray[1]}.`)
        })
        .catch(() => message.channel.send(`${argsArray[1]} is not a field`))
    }
  }
}

module.exports = Edit
