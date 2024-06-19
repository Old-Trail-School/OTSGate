module.exports = function(app) {
    const { proxy, scriptUrl } = require('rtsp-relay')(app);
    const StreamURL = process.env.StreamURL;
    const handler = proxy({
        url: StreamURL,
        verbose: false,
    });
    //console.log(scriptUrl);
  };