const Discord = require('discord.js')
const bot = new Discord.Client()

const dotenv = require('dotenv')
dotenv.config()

bot.login('process.env.DISCORD_TOKEN')
