const commando = require('discord.js-commando')

class TrialPicker extends commando.Command{
  constructor(client){
    super(client, {
      name: 'trial',
      group: 'random',
      memberName: 'trial',
      description: 'Picks a random trial'
    })
  }

  async run(message){
    const trials = ['vAA', 'vHRC', 'vSS', 'vMOL', 'vHOF', 'vAS', 'vCR', 'vSS', 'vAA HM', 'vHRC HM', 'vSS HM', 'vMOL HM', 'vHOF HM', 'vAS+1 Poison', 'vAS+1 Nightblade', 'vAS+2', 'vCR+1 Ice', 'vCR+1 Fire', 'vCR+1 Lightning', 'vCR+2 Ice/Lightning', 'vCR+2 Ice/Fire', 'vCR+2 Fire/Lightning', 'vCR+3', 'vSS Fire HM', 'vSS Ice HM', 'vSS Golden HM', 'vSS Fire/Ice HM', 'vSS Fire/Golden HM', 'vSS Ice/Golden HM', 'vSS HM']

    const index = (Math.floor(Math.random() * (trials.length)))

    message.channel.send(trials[index])
  }
}

module.exports = TrialPicker
