const dotenv = require('dotenv')
dotenv.config()

const commando = require('discord.js-commando')
const bot = new commando.Client()

bot.registry.registerGroup('random', 'Random')
bot.registry.registerDefaults()
bot.registry.registerCommandsIn(__dirname + '/commands')

// const Discord = require('discord.js')
// const bot = new Discord.Client()
// bot.on('message', (message) =>{
//   if(message.content === 'hello'){
//     // message.reply('hello')
//     message.channel.sendMessage('hello')
//   }
// })

bot.login(process.env.DISCORD_TOKEN)
