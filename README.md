<div align="center">

  <img src="public/favicon.ico" alt="logo" width="200" height="auto" />
  <h1>OTSGate</h1>
  
  <p>
    A small stack for remote operation of the back gate
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
    <a href="https://github.com/Old-Trail-School/OTSGate/wiki">Documentation</a>
  <span> · </span>
    <a href="https://github.com/Old-Trail-School/OTSGate/issues">Report Bug</a>

</div>

<br />

<!-- Table of Contents -->
# :notebook_with_decorative_cover: Table of Contents

- [:notebook\_with\_decorative\_cover: Table of Contents](#notebook_with_decorative_cover-table-of-contents)
  - [:star2: About the Project](#star2-about-the-project)
    - [:camera: Screenshots](#camera-screenshots)
    - [:space\_invader: Tech Stack](#space_invader-tech-stack)
    - [:dart: Features](#dart-features)
    - [:key: Environment Variables](#key-environment-variables)
  - [:toolbox: Getting Started](#toolbox-getting-started)
    - [:bangbang: Prerequisites](#bangbang-prerequisites)
    - [:gear: Installation](#gear-installation)
    - [:triangular\_flag\_on\_post: Deployment](#triangular_flag_on_post-deployment)
  - [:eyes: Usage](#eyes-usage)
  - [:compass: Roadmap](#compass-roadmap)
  - [:wave: Contributing](#wave-contributing)
  - [:warning: License](#warning-license)
  - [:handshake: Contact](#handshake-contact)

  

<!-- About the Project -->
## :star2: About the Project
A NodeJS/Express stack to allow for remote opening of the back gate

<!-- Screenshots -->
### :camera: Screenshots

<div align="center"> 
  <img src="https://placehold.co/600x400?text=Your+Screenshot+here" alt="screenshot" />
</div>


<!-- TechStack -->
### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://www.w3.org/html/">HTML</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">Javascript</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">Javascript</a></li>
    <li><a href="https://nodejs.org">Node.js</a></li>
    <li><a href="https://expressjs.com/">Express.js</a></li>  
  </ul>
</details>

<!-- Features -->
### :dart: Features

- Hosts an express web server that serves a control webpage
- Connects to and exposes RTSP stream from IP camera for display on control webpage
- Connects to the Controlbyweb webrelay to pulse the relay when the button on the webpage is pressed, and #TODO monitor the state of the gate and update the control button accordingly


<!-- Env Variables -->
### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`ServerHost`

`ServerPort`

`GateEndpoint`

`GatePassword` - String in form of `"Basic ***"` where *** is the Base64-encoded password of the webrelay.

`StreamURL`


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

Start the server

```bash
  node index.js
```


<!-- Deployment -->
### :triangular_flag_on_post: Deployment

To deploy this project run

##TODO


<!-- Usage -->
## :eyes: Usage

Use this space to tell a little more about your project and how it can be used. Show additional screenshots, code samples, demos or link to other resources.


##TODO

<!-- Roadmap -->
## :compass: Roadmap

* [x] Refactor into cleaner files
* [ ] Read status of gate to live-update button text


<!-- Contributing -->
## :wave: Contributing

<a href="https://github.com/Old-Trail-School/OTSGate/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Old-Trail-School/OTSGate" />
</a>


Contributions are always welcome!

See me for ways to help!



<!-- License -->
## :warning: License

Distributed under no License.


<!-- Contact -->
## :handshake: Contact

Ben Smith - bsmith@oldtrail.org

Project Link: [https://github.com/Old-Trail-School/OTSGate](https://github.com/Old-Trail-School/OTSGate)