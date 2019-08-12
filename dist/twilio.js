
var request = require('request-promise').defaults({ simple: false });
const accountSid = 'AC2f2ed56aae731e48fa4151f8f24236ad';
const authToken = '48facf84dcdde0f5e43c7667ef96be2a';
const client = require('twilio')(accountSid, authToken);




module.exports = (app) => {


   app.post('/twilio', (req, res) => {

    let phone_number = req.body["formData"];
    console.log("here is the incoming phone number", phone_number);
    if (req.body) {

        console.log("sucessful post to /twilio");
        client.calls
          .create({
            url: 'http://demo.twilio.com/docs/voice.xml',
             to: phone_number,
             from: '+12172882015'
           })
          .then(call => console.log("here is call.sid", call.sid))
          .catch(function (err) {

          console.log("Unsuccessful call", err);

          res.status(500);

        });

       res.status(200).send("A recorded phone message was sent to " + phone_number);


    }
    else{
         res.status(400).send("Error posting form Data in twilio");
    }
  });
}
