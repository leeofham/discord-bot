const commando = require('discord.js-commando')

class DiceRollCommand extends commando.Command{
  constructor(client){
    super(client, {
      name: 'roll',
      group: 'random',
      memberName: 'roll',
      description: 'Rolls a die'
    })
  }

  async run(message, args){
    const roll = Math.floor(Math.random() * args) + 1
    message.reply(`You rolled a ${roll}`)
  }
}

module.exports = DiceRollCommand
