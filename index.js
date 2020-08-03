// Importing mongotb modules specifcially
// mongo db client obejct 
var MongoClient = require('mongodb').MongoClient
const express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

const app = express()

// Mongodb database uri 
const uri = "mongodb+srv://armanarya:godbless@cluster0.zdamr.mongodb.net/Cluster0?retryWrites=true&w=majority";

// Database varible
// we create this variable to resure the
// db connection when we want to query our db
// or in other words a request
let db;
// Make connection pass in parrameters of database 
// Here we are using the functions we just imported
// to connect to our db
// {useUnifiedTopology: true} : 
MongoClient.connect(uri, {useUnifiedTopology: true},(err, client) =>{
     if (err) throw err;

     console.log('MongoDB connection Succeeded.');

    // creating our db
    // call it whatever you want but make sure its relevant
     db = client.db('heroes')
})

var Schema = new mongoose.Schema({
	_id    : String,
	name: String,
	age   : Number
});
 
var user = mongoose.model('emp', Schema);

app.post('/new', (req, res) =>{
    db.collection('hero').insertOne({
            name: req.body,
            email: req.body,
    }, (err, result) =>{
        if(err) throw err;
        res.send(result);
    })
})    

app.get('/getBlog', (req, res) =>{
    db.collection('blogs').findOne({
        title: 'hello world',
    }, (err, result) =>{
        if(err) throw err;
        res.send(result);
    })
})

var port = process.env.Port || 8080;
app.listen(port, ()=>{
    console.log('Listenig on port', port)
})

//startpage
app.get('/', function(req, res) {
    res.sendfile('./index.html')
})
