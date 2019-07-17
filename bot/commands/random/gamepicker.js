const commando = require('discord.js-commando')

class GamePicker extends commando.Command{
  constructor(client){
    super(client, {
      name: 'game',
      group: 'random',
      memberName: 'game',
      description: 'Picks a random game'
    })
  }

  async run(message){
    const games = ['Fortnite', 'Rocket League']

    const index = (Math.floor(Math.random() * (games.length)))

    message.channel.send(games[index])
  }
}

module.exports = GamePicker
