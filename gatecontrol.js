const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); //url fetching
module.exports = {
  openGate: async function(req,res) {
    console.log(new Date().toISOString(),':', 'Open Gate button pressed');
    try {
      const response = await fetch(`http://${process.env.GateEndpoint}/state.json?relay1=2`, {
          method: 'GET',
          headers: {
              'Authorization': 'Basic dXNlcjpXM2JSM2xheSE=',
          }
        });
  } catch (error) {
      console.error('Error:', error);

  }
  },
  bar: function() {
    // function code
  }
};