/**
 * client-side logic that handles sending the open request and updating the button text
 */
window.onload = function(){
const gateButton = document.getElementById('gate-toggle');
gateButton.addEventListener('click', function() {
  gateButton.textContent = "Please Wait";
  fetch('/button-clicked', { method: 'POST' })//TODO: implement logic to correlate button text with gate status
  
    .then(response => {
        console.log(response); //DEBUG, when I was testing the gate connection would time out, resulting in weird errors. wanted to see the response
      if (response.ok)
      {
        gateButton.textContent = 'Please Wait - Gate is Moving' ; //Don't really have a way to determine gate status, so just going to change button name and wait a bit 
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