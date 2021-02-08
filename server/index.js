// server/js
require('dotenv').config({ path: './.env.local'});
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require('cors');
const app = express();
const port = 8081;

// setup app
app.use(cors());
app.use(function(req, res, next) {
  // Response Headers
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Riot request header with auth token
RiotHeader = {'X-Riot-Token' : process.env.RIOT_API_KEY};

// Get BR LoL API call
app.get("/api/BR/*", (req, res) => {
  var replacedPath;
  replacedPath = req.path.replace('/api/BR/','/');
  fetch('https://br1.api.riotgames.com'+replacedPath,{headers:RiotHeader})
  .then((response)=>{
    return response.json();
  })
  .then((data) => {
    res.send(data);
  })
});

// Get EUNE LoL API call
app.get("/api/EUNE/*", (req, res) => {
  var replacedPath;
  replacedPath = req.path.replace('/api/EUNE/','/');
  fetch('https://eun1.api.riotgames.com'+replacedPath,{headers:RiotHeader})
  .then((response)=>{
    return response.json();
  })
  .then((data) => {
    res.send(data);
  })
});

// Get EUW LoL API call
app.get("/api/EUW/*", (req, res) => {
  var replacedPath;
  replacedPath = req.path.replace('/api/EUW/','/');
  fetch('https://euw1.api.riotgames.com'+replacedPath,{headers:RiotHeader})
  .then((response)=>{
    return response.json();
  })
  .then((data) => {
    res.send(data);
  })
});

// Get LAN LoL API call
app.get("/api/LAN/*", (req, res) => {
  var replacedPath;
  replacedPath = req.path.replace('/api/LAN/','/');
  fetch('https://la1.api.riotgames.com'+replacedPath,{headers:RiotHeader})
  .then((response)=>{
    return response.json();
  })
  .then((data) => {
    res.send(data);
  })
});

// Get LAS LoL API call
app.get("/api/LAS/*", (req, res) => {
  var replacedPath;
  replacedPath = req.path.replace('/api/LAS/','/');
  fetch('https://la2.api.riotgames.com'+replacedPath,{headers:RiotHeader})
  .then((response)=>{
    return response.json();
  })
  .then((data) => {
    res.send(data);
  })
});

// Get NA LoL API call
app.get("/api/NA/*", (req, res) => {
  var replacedPath;
  replacedPath = req.path.replace('/api/NA/','/');
  fetch('https://na1.api.riotgames.com'+replacedPath,{headers:RiotHeader})
  .then((response)=>{
    return response.json();
  })
  .then((data) => {
    res.send(data);
  })
});

// Get OCE LoL API call
app.get("/api/OCE/*", (req, res) => {
  var replacedPath;
  replacedPath = req.path.replace('/api/OCE/','/');
  fetch('https://oc1.api.riotgames.com'+replacedPath,{headers:RiotHeader})
  .then((response)=>{
    return response.json();
  })
  .then((data) => {
    res.send(data);
  })
});

// Get RU LoL API call
app.get("/api/RU/*", (req, res) => {
  var replacedPath;
  replacedPath = req.path.replace('/api/RU/','/');
  fetch('https://ru.api.riotgames.com'+replacedPath,{headers:RiotHeader})
  .then((response)=>{
    return response.json();
  })
  .then((data) => {
    res.send(data);
  })
});

// Get TR LoL API call
app.get("/api/TR/*", (req, res) => {
  var replacedPath;
  replacedPath = req.path.replace('/api/TR/','/');
  fetch('https://tr1.api.riotgames.com'+replacedPath,{headers:RiotHeader})
  .then((response)=>{
    return response.json();
  })
  .then((data) => {
    res.send(data);
  })
});

// Get JP LoL API call
app.get("/api/JP/*", (req, res) => {
  var replacedPath;
  replacedPath = req.path.replace('/api/JP/','/');
  fetch('https://p1.api.riotgames.com'+replacedPath,{headers:RiotHeader})
  .then((response)=>{
    return response.json();
  })
  .then((data) => {
    res.send(data);
  })
});

// Get KR LoL API call
app.get("/api/KR/*", (req, res) => {
  var replacedPath;
  replacedPath = req.path.replace('/api/KR/','/');
  fetch('https://kr.api.riotgames.com'+replacedPath,{headers:RiotHeader})
  .then((response)=>{
    return response.json();
  })
  .then((data) => {
    res.send(data);
  })
});

// Get DataDragon API call
app.get("/api/DD/*", (req, res) => {
  var replacedPath;
  replacedPath = req.path.replace('/api/DD/','/');
  fetch('https://ddragon.leagueoflegends.com'+replacedPath)
  .then((response)=>{
    return response.json();
  })
  .then((data) => {
    res.send(data);
  })
});

// listen on the port
app.listen(port);
