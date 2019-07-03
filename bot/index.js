const dotenv = require('dotenv')
dotenv.config()

const commando = require('discord.js-commando')
const bot = new commando.Client()

bot.registry.registerGroup('random', 'Random')
bot.registry.registerGroup('events', 'Event')
bot.registry.registerDefaults()
bot.registry.registerCommandsIn(__dirname + '/commands')

bot.login(process.env.DISCORD_TOKEN)
