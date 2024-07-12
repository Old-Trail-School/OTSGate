//Main server file for gate listener

require("dotenv").config(); //import environment vars
fetch = require('node-fetch'); //http fetch
const express = require('express');//webserver package
const app = express();//initialize webserver 
var EventLogger = require('node-windows').EventLogger; //Windows Event Logging include

var log = new EventLogger('OTSGate'); //start logging

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
  log.info('Webhook received; querying gate');

  //but first, let's get the status of the gate--don't want to send pulse if gate is in motion/open.
  var gateStatus = await getGateStatus(); //see function for more info on statuses

  switch (gateStatus) {
    case 1://gate is closing, dont send command
      log.warn("Gate is in motion, disregarding command");
      break;
    case 2://gate held open, don't send command
      log.warn("Gate is currently open, disregarding command");
      break;
    case 3: //Gate is in motion
      log.warn("Gate is in motion, disregarding command")
    default:
      log.info('Gate is closed, sending command')
      sendOpenCommand();//open the gate
      break;  }

  res.set('Connection', 'close');
  res.end('Response received, connection closing');
});

async function getGateStatus() {//Gets the status of the two digitalinputs
  try {
      const response = await fetch(`http://${process.env.GateEndpoint}/state.json`, { //get state json
        method: 'GET',
        headers: {
           'Authorization': process.env.GatePassword, //HTTP authorization. Should be in .env file.
        }
      });
      if (!response.ok) {
          //log.error(`HTTP error! status: ${response.status}`);
          console.error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); //convert response to JSON
      
      const isOpen = data.digitalInput1; //only is active when gate is at open limit
      const isMoving = data.digitalInput2; //active when gate is in motion (either direction)

    if (isOpen == 1 && isMoving == 1) {//gate at open limit and begun to move (closing)
        return 1
    } else if (isOpen == 1 && isMoving == 0) {//gate is open but not in motion. standard 'open' state
        return 2
    } else if (isOpen == 0 && isMoving == 1) {//gate is in motion
        return 3
    } else {//both 0 - gate is closed and not moving. standard closed state.
        return 4
    }  
  } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
      //log.error(`Error fetching data: ${error.message}`)
  }
}

async function sendOpenCommand(){
  try {
    const response = await fetch(`http://${process.env.GateEndpoint}/state.json?relay1=2`, { //send actual request to webrelay. This tells relay1 to pulse on for 2 seconds
         method: 'GET',
         headers: {
            'Authorization': process.env.GatePassword, //HTTP authorization. Should be in .env file.
         }
       });
} catch (error) {
    log.error(error); //log any errors. I've  seen the CBW relay close connection early, but I think that's from when I've sent too many requests in a short period of time.
    //console.log(error);
}
}


app.listen(process.env.ServerPort,process.env.ServerHost, () => { //start the server
    log.info(`OTSGate Server running at ${process.env.ServerHost}:${process.env.ServerPort}`,1000, function(){
    console.log(new Date().toISOString(),':',`OTSGate Server running at ${process.env.ServerHost}:${process.env.ServerPort}` );
    });
  });