//Main server file for gate listener

require("dotenv").config(); //import environment vars
fetch = require('node-fetch');
const express = require('express');//webserver package
const app = express();//initialize webserver 
var EventLogger = require('node-windows').EventLogger; //Windows Event Logging include

var log = new EventLogger('OTSGate');

// Middleware to validate custom header--server is listening on localhost only, but this will add an additional security layer
const validateCustomHeader = (req, res, next) => {
    const customHeader = req.headers['evsrvtoken'];//name of custom header - arbitrary
  
    if (customHeader === `${process.env.NVRCode}`) { //if custom header value matches what's in .env
      next(); // Header is valid, proceed to the route handler
    } else {
      res.status(401).send('Invalid custom header'); //reply with error. NVR won't do anything about it though.
      log.warn('Malformed Packet received; rejecting')
    }
  };

app.post('/ExacqGate', validateCustomHeader, async (req, res) => { //when request is received
  // console.log(new Date().toISOString(),':', 'Hook received, sending request to webrelay'); //log it | old way before switching to node-windows Eventlogger
  log.info('Received hook from NVR; sending request to WebRelay')
   try {
    const response = await fetch(`http://${process.env.GateEndpoint}/state.json?relay1=2`, { //send actual request to webrelay. This tells relay1 to pulse on for 2 seconds
         method: 'GET',
         headers: {
            'Authorization': process.env.GatePassword, //HTTP authorization. Should be in .env file.
         }
       });
    res.set('Connection', 'close');
    res.end('Response received, connection closing');

} catch (error) {
    log.error(error); //log any errors. I've  seen the CBW relay close connection early, but I think that's from when I've sent too many requests in a short period of time.
    //console.log(error);
}
});







app.listen(process.env.ServerPort,process.env.ServerHost, () => { //start the server
    log.info(`OTSGate Server running at ${process.env.ServerHost}:${process.env.ServerPort}`,1000, function(){
      console.log(new Date().toISOString(),':',`OTSGate Server running at ${process.env.ServerHost}:${process.env.ServerPort}` );
    });
  });