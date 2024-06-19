const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); //url fetching
module.exports = {
  openGate: async function(req,res) {
    console.log(new Date().toISOString(),':', 'Open Gate button pressed');
    try {
      const response = await fetch(`http://${process.env.GateEndpoint}/state.json?relay1=2`, {
          method: 'GET',
          headers: {
              'Authorization': process.env.GatePassword,
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