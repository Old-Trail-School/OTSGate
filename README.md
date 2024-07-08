<div align="center">

  <img src="https://lh4.googleusercontent.com/lhk-4cc4c6EU23kwecMpiDR3A5PM5I2qeoPQd5-JNKKraWnvTYV4hzL3zlIoyEIsMI_DNSjfDpvq2APl-tzl7_M_IJlUvdjVIkFXS3IZbolMDP3piauInXwudMpTkFt6Kw=w1280" alt="logo" width="200" height="auto" />
  <h1>OTSGate</h1>
  
  <p>
    A small node.js program to integrate a ControlByWeb relay with Exacqvision NVR
    <!-- Also the culmination of much toil -->
  </p>
<p>
    <a href="https://github.com/Old-Trail-School/OTSGate/graphs/contributors">
        <img src="https://img.shields.io/github/contributors/Old-Trail-School/OTSGate" alt="contributors" />
    </a>
    <a href="https://github.com/Old-Trail-School/OTSGate/issues">
        <img src="https://img.shields.io/github/issues/Old-Trail-School/OTSGate" alt="open issues" />
    </a>
  </a>
</p>
<h4>
    <a href="https://oldtrail.freshdesk.com/a/solutions/articles/69000856624">Documentation</a>
  <span> · </span>
    <a href="https://github.com/Old-Trail-School/OTSGate/issues">Report Bug</a>

</div>

<br />

<!-- About the Project -->
## :star2: About the Project
A NodeJS/Express stack to allow for remote opening of the back gate. This facilitates the front desk to operate the gate without needing to give out the code

<!-- Screenshots -->
### :camera: Screenshots

<div align="center"> 
  <img src="https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69119472327/original/u0GCd42fo9AF5idfmePLLXryjMQaLH0soA.png"
  alt="screenshot" />
</div>


<!-- Features -->
### :dart: Features

- Hosts an express web server that listens for a POST request from the NVR.
- when a (correct) POST is received; sends the request to the webrelay


<!-- Env Variables -->
### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`ServerHost` - ip/hostname where the server listens

`ServerPort` - port for the server to listen on

`GateEndpoint` - IP address of the webrelay

`GatePassword` - String in form of `"Basic ***"` where *** is the Base64-encoded password of the webrelay.


<!-- Getting Started -->
## 	:toolbox: Getting Started

<!-- Prerequisites -->
### :bangbang: Prerequisites

This project uses <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">npm</a> as the package manager. 


<!-- Installation -->
### :gear: Installation
Clone the project

```bash
  git clone https://github.com/Old-Trail-School/OTSGate.git
```

Go to the project directory

```bash
  cd OTSGate
```

Install dependencies

```bash
  npm install
```

Create .env file
```bash
  nano .env
```
Start the server

```bash
  node gatecontrol.js
```


<!-- Deployment -->
### :triangular_flag_on_post: Deployment

The repo also includes install-service.js, and uninstall-service.js. These scripts utilize the node-windows package to install the nodejs application as a Windows service. This is how it should be run in production

<!-- License -->
## :warning: License

Distributed under no License.


<!-- Contact -->
## :handshake: Contact

Ben Smith - bsmith@oldtrail.org

Project Link: [https://github.com/Old-Trail-School/OTSGate](https://github.com/Old-Trail-School/OTSGate)
