/**
 * Main file/entry point--running as a service should use this file now.
 */

//Variable import and includes
require("dotenv").config(); //import environment vars
const express = require('express');//webserver require
const app = express();//initialize webserver init
const handler = require('./ipcam')(app);//import ipcamera services
const gateControl = require('./gatecontrol'); //import gate services 
const WebSocket = require('ws'); //may be needed?

//Main entry-point for the app. Hosts all of the public folder.
app.use(express.static('public'));

// set up ip cam stream endpoint
app.ws('/cameraFeed', handler);

//endpoint called when button on webpage is clicked
app.post('/button-clicked', async (req, res, next) => {
    try {
        result = await gateControl.openGate(req,res);
        console.log("post result:",result); //debug
        res.send(result);
      } catch (error) {
        console.log("post eror:",error);
      }    
  });



app.get('/test', async (req, res) => {
    gateControl.getStatus(req,res)
  });


app.listen(process.env.ServerPort,process.env.ServerHost, () => { //start the server
  console.log(`OTSGate Server running at ${process.env.ServerHost}:${process.env.ServerPort}`);

    
});
