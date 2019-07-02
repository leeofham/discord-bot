const dotenv = require('dotenv')
dotenv.config()

const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('message', (message) =>{
  if(message.content === 'hello'){
    // message.reply('hello')
    message.channel.sendMessage('hello')
  }
})

bot.login(process.env.DISCORD_TOKEN)
