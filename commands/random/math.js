const commando = require('discord.js-commando')

class Math extends commando.Command{
  constructor(client){
    super(client, {
      name: 'math',
      group: 'random',
      memberName: 'math',
      description: 'calculator'
    })
  }

  async run(message, args){
    const mathArray = args.split(' ')
    let total
    if(mathArray[1] === '+') {
      total = parseFloat(mathArray[0]) + parseFloat(mathArray[2])
    } else if(mathArray[1] === '-'){
      total = parseFloat(mathArray[0]) - parseFloat(mathArray[2])
    } else if(mathArray[1] === '*') {
      total = parseFloat(mathArray[0]) * parseFloat(mathArray[2])
    } else{
      total = parseFloat(mathArray[0]) / parseFloat(mathArray[2])
    }
    message.reply(total)
  }
}

module.exports = Math
