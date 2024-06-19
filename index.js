/**
 * A 'simple' nodejs/express app to allow manual opening of the gate
 * 
 * 
 */

//Variable import and includes
require("dotenv").config() //import environment vars
const express = require('express')//webserver
const app = express();//initialize webserver
const handler = require('./ipcam')(app);//ipcamera service handler
const gateControl = require('./gatecontrol'); //gate control service


// set up  ip cam stream endpoint
app.ws('/cameraFeed', handler);

//endpoint called when button on webpage is clicked
app.post('/button-clicked', async (req, res, next) => {
    try {
        result = await gateControl.openGate(req,res);
        res.send(result);
      } catch (error) {
        res.send(error);
      }    
  });


//web page to view the stream

//old method, before js got involved
// app.get('/', (req, res) =>
//   res.sendFile("public/index.html",{root: __dirname })
// );
app.use(express.static('public'));//serve the public folder

app.get('/state/:id', async (req, res) => {
    try {
      const response = await fetch(`http://${GateEndpoint}/state.json`, {
        method: 'GET',
        headers: {
            'Authorization': 'Basic dXNlcjpXM2JSM2xheSE=',
            'Accept': 'application/json'
        }
      });

      const data = await response.json();
      const id = req.params.id;

     // const filteredData = data.data.filter(item => item.id === id);
     switch(id) {
        case "relay1":
            res.json(data.relay1);
          break;
        case "relay2":
          // code block
          res.json(data.relay2);
          break;
        case "vin":
            res.json(data.vin);
            break;
        default:
            res.json(data);
      }
     

    } catch (error) {
      console.error('Error fetching state.json:', error);
      res.status(500).send('An error occurred while fetching state.json');
    }
  });


app.listen(process.env.ServerPort,process.env.ServerHost, () => { //start the server
  console.log(`OTSGate Server running at ${process.env.ServerHost}:${process.env.ServerPort}`);
 
});
