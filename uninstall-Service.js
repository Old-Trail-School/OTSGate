//stops and unregisters running nodejs service

var Service = require('node-windows').Service;

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

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
});

// Uninstall the service.
svc.uninstall();