var express = require('express');
var hotelRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017";
var url = "mongodb+srv://kishan_04:kishan2809@cluster0.bgcvf.mongodb.net/aryabhata?retryWrites=true&w=majority";

function router(menu){
  hotelRouter.route('/')
      .get(function(req,res){
          // creating connection
          mongodb.connect(url,(err,connection)=>{
            if(err){
              res.status(500).send("Error While Connecting")
            }else{
              //connection got created and pass db name
              const dbo = connection.db('aryabhata');
              //make find query to collection
              dbo.collection('hotels').find({}).toArray((err,data) => {
                if(err){
                  res.status(501).send("Error while fetching")
                }else{
                  res.render('hotel',{title:"Hotel Page",hoteldata:data,menu})
                }
              })
            }
          })
      })

  //http://localhost:8700/hotel/details
  hotelRouter.route('/details/:id')
      .get(function(req,res){
        //var id = req.params.id
        var {id} = req.params
        mongodb.connect(url,(err,connection) => {
          if(err){
            res.status(500).send("Error while connecting")
          }else{
            const dbo = connection.db('aryabhata')
            dbo.collection('hotels').findOne({_id:id},(err,data)=>{
              if(err){
                res.status(501).send("Error while fetching")
              }else{
                res.render('hotelDetails',{title:"Hotel Details Page",hoteldata:data,menu})
              }
            })
          }
        })
      })
    
   return hotelRouter
}

module.exports = router;