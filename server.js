var express=require("express");
var app=express();
// var mongojs=require("mongojs");
// var db=mongojs("fissionTest",['fissionTest']);
//var bodyParser=require("body-parser");


app.use(express.static(__dirname+"/demo"));
//app.use(bodyParser.json());

//code for sending data to MongoDb database
// app.post('/fissionTest',function(req,res){
// db.fissionTest.insert(req.body,function(error,doc){
//    res.json(doc);
//}
// });

app.listen(3000);
console.log("Server is running at port 3000");
