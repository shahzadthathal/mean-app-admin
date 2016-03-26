// Email Controller

var Services = require('../services');
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport();


module.exports.send = function(req, res){
		
		console.log(req.body);
		
    var mail = {
        from: req.body.inputName+'<'+req.body.inputEmail+'>',
        to: "shahzadthathal@gmail.com",
        subject: req.body.inputSubject,
        text: req.body.inputMessage
    }

    transporter.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
            res.json(error);
        }else{
            console.log("Message sent: " + response.message);
            res.json(response.message);
        }

        transporter.close();
    });



}
