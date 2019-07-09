// same as import mongoose from 'mongoose'
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const eventSchema = new mongoose.Schema({
  _id: {type: String, required: true },
  name: {type: String, required: 'Please provide a name for the event' },
  description: {type: String},
  date: {type: Number, required: 'Please enter a date yyyy-mm-dd hh:mm'},
  startTime: {type: String, required: 'Please enter a start time'},
  endTime: {type: String, required: 'Please enter an end time'},
  reminder: {type: Array},
  tanks: {type: Array, required: true, default: ['Empty', 'Empty']},
  healers: {type: Array, required: true, default: ['Empty', 'Empty']},
  dds: {type: Array, required: true, default: ['Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty']},
  reminder1hr: {type: Boolean, default: false},
  reminder8hr: {type: Boolean, default: false},
  reminder24hr: {type: Boolean, default: false}
})

eventSchema.plugin(uniqueValidator)

// same as 'export default mongoose.Model(...)'
module.exports = mongoose.model('Event', eventSchema)
