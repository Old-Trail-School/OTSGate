window.onload = function(){
const gateButton = document.getElementById('gate-toggle');//get the button
gateButton.addEventListener('click', function() {//add handler
  fetch('/button-clicked', { method: 'POST' })//hit the node endpoint
    .then(response => {
        console.log(response);
      if (response.ok)
      {
        gateButton.textContent = 'Gate is Moving - Please Wait' ; //Don't really have a way to determine gate status, so just going to change button name and wait a bit 
        gateButton.disabled=true; //don't want to send >1 open cmd.
        setTimeout(() => {
          gateButton.textContent = 'Open Gate' ;
          gateButton.disabled=false;
          }, 30000);//Wait 30s, then reset the button
      }
    })
    .catch(error => {
      console.error('Error:', error);
      gateButton.textContent = 'Unknown Error' ;
});
});
};