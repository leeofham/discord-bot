const dotenv = require('dotenv')
dotenv.config()

// const axios = require('axios')
// const moment = require('moment')

const commando = require('discord.js-commando')
const bot = new commando.Client()

bot.registry.registerGroup('random', 'Random')
bot.registry.registerGroup('events', 'Events')
bot.registry.registerGroup('admin', 'Admin')
bot.registry.registerDefaults()
bot.registry.registerCommandsIn(__dirname + '/commands')

// bot.on('ready', () =>{
//   const channel = bot.channels.find(channel => channel.id === '595540442087424041')
//   setInterval(() => {
//     let difference
//     axios.get('http://localhost:4000/events/')
//       .then(function getDates(res){
//         for(let i = 0; i<res.data.length; i++){
//           const now = moment().valueOf()
//           difference = res.data[i].date - now
//
//           // 24 hours then 8 hours then 1 hour
//           if(difference <= 86400000 && !res.data[i].reminder1hr){
//             channel.send('Hello')
//           }
//         }
//       }, 10 * 1000)
//
//   })
// })

bot.login(process.env.DISCORD_TOKEN)
