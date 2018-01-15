var express=require("express");
var app=express();

app.use(express.static(__dirname+"/demo"));

// app.get('/contactList',function(req,res){
// console.log("get request");



// res.json(contactList);
// });

app.listen(3000);
console.log("Server is running at port 3000");