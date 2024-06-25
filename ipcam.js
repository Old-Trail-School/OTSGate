/**
 * Sets up RTSP IP camera stream
 */
module.exports = function(app) {
    const StreamURL = process.env.StreamURL;
    const { proxy, scriptUrl } = require('rtsp-relay')(app);
    const handler = proxy({
        url: StreamURL,
        verbose: false,
    });
    //console.log(scriptUrl); //need to get this to the html
  };