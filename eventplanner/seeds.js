const mongoose = require('mongoose')
const { dbUri } = require('./config/environment')
const Event = require('./models/Event')
const moment = require('moment')

mongoose.connect(dbUri, (err, db) => {
  db.dropDatabase()
  return Event.create([{
    _id: moment('2019-07-19').format('DD.MM.YY'),
    name: 'Veteran Sunspire',
    description: 'Farm/completion run. Please bring as much stamina dds as possible.',
    date: moment('2019-07-19 14:00').valueOf(),
    startTime: '20:30',
    endTime: '22:30',
    channel: '601751798662823936'
  }, {
    _id: moment('2019-07-25').format('DD.MM.YY'),
    name: 'Veteran Sunspire',
    description: 'Farm/completion run. Please bring as much stamina dds as possible.',
    date: moment('2019-07-25 20:30').valueOf(),
    startTime: '20:30',
    endTime: '22:30',
    channel: '601751798662823936'
  }, {
    _id: moment('2019-07-27').format('DD.MM.YY'),
    name: 'Veteran Sunspire',
    description: 'Farm/completion run. Please bring as much stamina dds as possible.',
    date: moment('2019-07-27 20:30').valueOf(),
    startTime: '20:30',
    endTime: '22:30',
    channel: '601751798662823936'
  }
  ])
})
  .then(() => mongoose.connection.close()) // disconnect from the database
  .catch(err => {
    console.log(err) // log any errors
    mongoose.connection.close() // disconnect from the database
  })
