//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash= require('lodash');
const mongoose =require("mongoose");
const https = require("https");



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/todolistDB",{ useNewUrlParser: true, useUnifiedTopology: true});


const postSchema = new mongoose.Schema({

	title: String,
	content: String
});

const Post = mongoose.model("Post", postSchema);


app.get("/", function(req, res){

  res.render('home');
});


app.post("/", function(req, res){

	const name = req.body.name;
	const email = req.body.email;
	
	const data={
		members:[{
			email_address: email,
			status: "subscribed",
			merge_fields:{
				FNAME: name,
			}
		}]
	};

	var jsonData = JSON.stringify(data);

	const url= process.env.URL ;
	const options={
			method: "POST",
			auth: process.env.AUTH
		}

	const request= https.request(url, options, function(response){

		if(response.statusCode===200){
			res.render("success");

		}
		else
		{
			res.render("failure");
		}

		response.on("data", function(data){
			console.log(JSON.parse(data));
			console.log(response.statusCode);
		})

	})


	request.write(jsonData);
	request.end();
});



app.get("/sample", function(req, res){

  res.render('sample');
});

app.get("/payment", function(req, res){

  res.render('payment');
});

app.post("/", function(req, res){

});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});



