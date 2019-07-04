const mongoose = require('mongoose')
const { dbUri } = require('./config/environment')
const Event = require('./models/Event')
const moment = require('moment')

mongoose.connect(dbUri, (err, db) => {
  db.dropDatabase()
  return Event.create([{
    name: 'vSS Core Group',
    description: 'vSS Core Group run, Fire boss HM progression',
    date: moment.utc('2019-07-03'),
    startTime: '19:00',
    endTime: '22:00',
    reminder: ['1440', '480'],
    attendees: {
      tanks: ['leeofham', 'Alathil'],
      healers: ['Shases', 'Knight30'],
      dds: ['Grey', 'Abbervail', 'Chetter', 'Jayyab', 'Maninwhite', 'Arwen', 'Beyl', 'Fthis']
    }
  }, {
    name: 'vSS Core Group',
    description: 'vSS Core Group run, Fire boss HM progression',
    date: moment.utc('2019-07-04'),
    startTime: '19:00',
    endTime: '22:00',
    reminder: ['1440', '480'],
    attendees: {
      tanks: ['leeofham', 'Alathil'],
      healers: ['Shases', 'Knight30'],
      dds: ['Grey', 'Abbervail', 'Chetter', 'Jayyab', 'Maninwhite', 'Arwen', 'Beyl', 'Fthis']
    }
  }
  ])
})
  .then(() => mongoose.connection.close()) // disconnect from the database
  .catch(err => {
    console.log(err) // log any errors
    mongoose.connection.close() // disconnect from the database
  })
