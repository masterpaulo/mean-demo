var express = require('express');
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

var app = express();


app.use(express.static(__dirname+ "/public"));
app.use(bodyParser.json());

app.listen(5000);
console.log("server running at localhost:5000");

app.get('/contactlist', function(req,res){
	console.log("I've recieved a GET request...");
	db.contactlist.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});

});
app.post('/contactlist', function(req, res){
	console.log(req.body);
	db.contactlist.insert(req.body, function(err,doc){
		res.json(doc);
	});
});

app.delete('/contactlist/:id', function(req,res){
	var id = req.params.id;
	console.log("deleting entry id: " + id);
	db.contactlist.remove({_id:mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});
app.get('/contactlist/:id', function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id:mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
});
app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({
		query:{_id:mongojs.ObjectId(id)},
		update:{$set:{name:req.body.name, email:req.body.email, number:req.body.number}},
		new:true}, function(err,doc){
			res.json(doc);
		});

})


// var http = require('http');


// http.createServer(function(req,res){
//     res.writeHead(200, {'content-type':'text/plin'});
//     res.end('Hello world\n');
// }).listen(1337,'127.0.0.1');

// console.log('server running at localhost:1337');