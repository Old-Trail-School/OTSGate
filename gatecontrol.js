//Main config variables

//This mess of a line is the IPcamera rtsp url obfuscated--rtsp url contains credentials
const _0x6055ab=_0x475d;(function(_0x4b8da9,_0x5c3f56){const _0x32e8fd=_0x475d,_0x48ca4a=_0x4b8da9();while(!![]){try{const _0x50c556=-parseInt(_0x32e8fd(0x1de))/(0x2a4*-0x6+-0x27d+0x1256)*(parseInt(_0x32e8fd(0x1e6))/(-0x150a+0x1*0x1d39+-0x82d))+parseInt(_0x32e8fd(0x1dc))/(-0x1b*0xa2+-0x2f*0x72+0x2607)*(-parseInt(_0x32e8fd(0x1d9))/(-0x22e5*-0x1+-0xd8f+-0x1552))+-parseInt(_0x32e8fd(0x1e4))/(0x9c5+0x3cc+-0xd8c)+-parseInt(_0x32e8fd(0x1e5))/(-0x9e*-0xb+0x1db8+-0x247c)*(-parseInt(_0x32e8fd(0x1e2))/(0x4df+0x2643*0x1+-0x2b1b))+parseInt(_0x32e8fd(0x1db))/(0x2*-0x482+0x2109+-0x17fd)*(parseInt(_0x32e8fd(0x1df))/(-0x2*0x12a7+0x1493+0x10c4))+parseInt(_0x32e8fd(0x1dd))/(0x1*0x27a+-0x40*-0x4d+0xad8*-0x2)+parseInt(_0x32e8fd(0x1e7))/(-0xd4a+0x2*0x102a+-0x12ff);if(_0x50c556===_0x5c3f56)break;else _0x48ca4a['push'](_0x48ca4a['shift']());}catch(_0x52958b){_0x48ca4a['push'](_0x48ca4a['shift']());}}}(_0x4f0f,-0x1*0x8d791+0x4*-0x280c6+-0x36e*-0x74b));function _0x475d(_0x1e0705,_0x13d61c){const _0x202d53=_0x4f0f();return _0x475d=function(_0x1331f8,_0x109a79){_0x1331f8=_0x1331f8-(0x1*-0xd8d+0x267b*-0x1+0xd*0x425);let _0x1e5642=_0x202d53[_0x1331f8];return _0x1e5642;},_0x475d(_0x1e0705,_0x13d61c);}const StreamURL=_0x6055ab(0x1e1)+_0x6055ab(0x1e3)+_0x6055ab(0x1da)+_0x6055ab(0x1e0);function _0x4f0f(){const _0x5b5b0c=['431658elEivy','2oIVWPa','4348553NzQebo','3468wLjmhq','dc!@10.1.7','589808TmDAVE','1821PXyISF','6028100ItXpUR','787053mvMPPF','27WZxVUl','8.26','rtsp://adm','77XHdWJT','in:$Nbe8uj','1468805bJdKHL'];_0x4f0f=function(){return _0x5b5b0c;};return _0x4f0f();}
//const StreamURL = 'rtsp://admin:password@ip' //unobfuscated

const ServerHost = 'localhost';
const ServerPort = 9874;
const GateEndpoint = '10.86.128.99'; //IP address of the gate controller.

//webapp setup/node includes
const express = require('express')
//const { RestClient } = require('typed-rest-client/RestClient');
const app = express();
const { proxy, scriptUrl } = require('rtsp-relay')(app);
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
//const fetch = require('node-fetch');
//const xml2js = require('xml-js');



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



const handler = proxy({ //ip cam stream
  //url: `rtsp://admin:admin@10.0.1.2:554/feed`, // if your RTSP stream need credentials, include them in the URL as above
  url: StreamURL,
  verbose: false,
});
// set up  ip cam stream endpoint
app.ws('/api/stream', handler);

app.post('/button-clicked', (req, res) => {//button clicked handler
    openGate();
    res.sendStatus(200); // Send a success status code in response
  });



async function openGate() {
    console.log('Gate should be opening!');
    try {
        const response = await fetch(`http://${GateEndpoint}/state.json?relay1=2`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic dXNlcjpXM2JSM2xheSE=',
                'Accept': 'application/json'
            }
          });
    } catch (error) {
        console.error('Error:', error);
    }
}


//web page to view the stream
app.get('/', (req, res) =>
  res.sendFile('index.html',{root: __dirname })
);


  




app.listen(ServerPort,ServerHost, () => { //Run the app
  console.log(`OTSGate Server running at ${ServerHost}:${ServerPort}`);
 
});