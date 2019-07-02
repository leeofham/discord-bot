//import the relevent Model
const Event = require('../models/Event')

function indexRoute(req, res, next){
  Event.find()
    .then(events => res.json(events))
    .catch(next)
}

function showRoute(req, res, next){
  Event.findById(req.params.id)
    .then(events => res.json(events))
    .catch(next)
}

function createRoute(req, res, next){

  // create a events using the data from the client
  Event.create(req.body)
    .then(events => res.status(201).json(events)) //this sends it as JSON
    .catch(next)
}

function updateRoute(req, res, next){
  Event.findById(req.params.id) // find the eventss
    .then(events => events.set(req.body)) // update the charater
    .then(events => events.save()) // save the eventss
    .then(events => res.json(events)) // send it as JSON
    .catch(next)
}

function deleteRoute(req, res, next){
  Event.findById(req.params.id)
    .then(events => events.remove()) //remove events
    .then(() => res.sendStatus(204)) // send response
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
}
