require("dotenv").config(); //import environment vars
const express = require('express');//webserver require
const app = express();//initialize webserver init
const handler = require('./ipcam')(app);//import ipcamera services
const gateControl = require('./gatecontrol'); //import gate services 
const WebSocket = require('ws'); //may be needed?
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function getJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }
  
  // Example usage:
  const url = 'http://139.64.170.23:9035/state.json'; // Replace with your API endpoint
  getJSON(url).then(json => console.log(json));



