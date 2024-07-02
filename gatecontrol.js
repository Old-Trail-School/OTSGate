//Main server file for gate listener

require("dotenv").config(); //import environment vars
const express = require('express');//webserver package
const app = express();//initialize webserver 


// Middleware to validate custom headers--server is listening on localhost only, but this should add *some* security
const validateCustomHeader = (req, res, next) => {
    const expectedHeaderValue = '302549743'; // value sent from edvr--set in webhook settings
    const customHeader = req.headers['evsrvtoken'];
  
    if (customHeader === expectedHeaderValue) {
      next(); // Header is valid, proceed to the route handler
    } else {
      res.status(401).send('Invalid custom header'); //reply with error. NVR won't do anything about it though.
    }
  };

app.post('/ExacqGate', validateCustomHeader, async (req, res) => { //when request is received
   console.log(new Date().toISOString(),':', 'Hook received, sending request to webrelay'); //log it
   try {
    const response = await fetch(`http://${process.env.GateEndpoint}/state.json?relay1=2`, { //send actual request to webrelay. This tells relay 1 to pulse for 2 seconds
         method: 'GET',
         headers: {
            'Authorization': process.env.GatePassword, //HTTP authorization. Should be in .env file.
         }
       });
} catch (error) {
    console.error(new Date().toISOString(),':', error); //log any errors. Occaisonaly I've seen the CBW relay close connection early, but I think that's from when I've sent too many requests in a short period of time.

}
});







app.listen(process.env.ServerPort,process.env.ServerHost, () => { //start the server
    console.log(`OTSGate Server running at ${process.env.ServerHost}:${process.env.ServerPort}`);
  });