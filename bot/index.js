const dotenv = require('dotenv')
dotenv.config()

const axios = require('axios')
const moment = require('moment')

const commando = require('discord.js-commando')
const bot = new commando.Client()

bot.registry.registerGroup('random', 'Random')
bot.registry.registerGroup('events', 'Events')
bot.registry.registerDefaults()
bot.registry.registerCommandsIn(__dirname + '/commands')

setInterval(function() {
  let difference
  axios.get('http://localhost:4000/events/')
    .then(function getDates(res){
      for(let i = 0; i<res.data.length; i++){
        const now = moment().valueOf()
        difference = res.data[i].date - now

        // 24 hours then 8 hours then 1 hour
        if(difference <= 86400000 && !res.data[i].reminder1hr){
          
        } else if(difference <= 28800000 && !res.data[i].reminder8hr){

        }
      }
    })
}, 10 * 1000)


bot.login(process.env.DISCORD_TOKEN)
