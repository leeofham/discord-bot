// same as import mongoose from 'mongoose'
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const eventSchema = new mongoose.Schema({
  name: {type: String, required: 'Please provide a name for the event' },
  description: {type: String},
  date: {type: Date, required: 'Please enter a date yyyy/mm/dd'},
  startTime: {type: String, required: 'Please enter a start time'},
  endTime: {type: String, required: 'Please enter an end time'},
  reminder: {type: Array},
  tanks: {type: Array, required: true, default: ['Empty', 'Empty']},
  healers: {type: Array, required: true, default: ['Empty', 'Empty']},
  dds: {type: Array, required: true, default: ['Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty']}
})

eventSchema.plugin(uniqueValidator)

// same as 'export default mongoose.Model(...)'
module.exports = mongoose.model('Event', eventSchema)
