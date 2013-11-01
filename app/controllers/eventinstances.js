var mongoose = require('mongoose')
  , async = require('async')
  , Eventinstance = mongoose.model('Eventinstance')
  , _ = require('underscore')


exports.create = function (req, res) {
  var eventinstance = new Eventinstance(req.body)
  eventinstance.commissioner = req.user
  eventinstance.save()
  // Create eventinstanceinstance for the given dates


  res.jsonp(eventinstance)
}

exports.show = function(req, res){
  res.jsonp(req.eventinstance);
}

exports.eventinstance = function(req, res, next, id){
  var Eventinstance = mongoose.model('Eventinstance')

  Eventinstance.load(id, function (err, eventinstance) {
    if (err) return next(err)
    if (!eventinstance) return next(new Error('Failed to load eventinstance ' + id))
    req.eventinstance = eventinstance
    next()
  })
}

exports.all = function(req, res){
 Eventinstance.find({commissioner: req.user._id }).populate('owner').populate('eventinstance').exec(function(err, eventinstance) {
   if (err) {
     res.render('error', {status: 500});
   } else {      
       res.jsonp(eventinstance);
   }
 });
}

exports.update = function(req, res){
  var eventinstance = req.eventinstance
  eventinstance = _.extend(eventinstance, req.body)
  eventinstance.save(function(err) {
    res.jsonp(eventinstance)
  })
}

exports.destroy = function(req, res){
  var eventinstance = req.eventinstance
  eventinstance.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    } else {
      res.jsonp(1);
    }
  })
}