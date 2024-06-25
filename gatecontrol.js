/**
 * Gate connection services
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

//const axios = require('axios');


module.exports = {
  openGate: async function(req,res) {
    console.log(new Date().toISOString(),':', 'Open Gate button pressed');
    try {
      console.log(new Date().toISOString(),':', 'Sending request to Webrelay');
      const response = await fetch(`http://${process.env.GateEndpoint}/state.json?relay1=2`, {
          method: 'GET',
          headers: {
              'Authorization': process.env.GatePassword,
          }
        });
  } catch (error) {
      //res.sendStatus(500);
      console.error(new Date().toISOString(),':', error);

  }
  },
  getStatus: async function(req,res,) {
    const response = await fetch(`http://${process.env.GateEndpoint}/state.json`, {
      method: 'GET',
      headers: {
          //'Authorization': process.env.GatePassword, //Disable for testing with demo endpoint
          'Accept': 'application/json'
      }
    });
    
  },
};