var express = require('express');
var cityRouter = express.Router();

function router(menu){

  //http://localhost:8700/city
  cityRouter.route('/')
    .get(function(req,res){
        //res.send(city)
        res.render('city',{title:"City Page",menu})
    })

  //http://localhost:8700/city/details
  cityRouter.route('/details/:id')
    .get(function(req,res){
        var id = req.params.id
        var name = req.query.name
        res.send(`City Details for id>>>${id} & ${name}` )
    })

    return cityRouter
}

module.exports= router;