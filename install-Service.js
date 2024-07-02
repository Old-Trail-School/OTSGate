//Installs and starts the nodejs script as a Windows Service.
//Uses the node-windows npm package.
//!!!Adjust script var depending on file location!!!


var Service = require('node-windows').Service; //init new service object

// Create a new service object
var svc = new Service({
  name:'OTSGate',
  description: 'Webhook listener from exacqvision to pulse the gate relay',
  script: 'C:\\GateControl\\gatecontrol.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();