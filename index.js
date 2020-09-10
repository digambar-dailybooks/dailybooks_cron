
const cron = require("node-cron");
const express = require("express");
let nodemailer = require("nodemailer");
const fs = require("fs"); 

app = express();


// sending emails at periodic intervals
cron.schedule("* * * * *", function(){
    console.log("----------SEND EMAIL-----------");
    console.log("Running Cron Job-1");
    sendEmail();
  });

// Setting a cron job 
cron.schedule("*/10 * * * * *", function() { 
    console.log("-----------Write Log----------");
    console.log("Running Cron Job-2");
    // Data to write on file 
    write_log();
}); 

 function write_log(){
    let data = `${new Date().toUTCString()}  : Server is working\n`; 
    // Appending data to logs.txt file 
    fs.appendFile("logs.txt", data, function(err) {  
        if (err) throw err;  
        console.log("Status Logged!"); 
    }); 
 }

 
  function sendEmail(){
    // create mail transporter
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: "digambark22@gmail.com",
        pass: ""
        }
    });

    let mailOptions = {
        from: "digambark22@gmail.com",
        to: "digambar.kadam@dailybooks.in",
        subject: `Database Backup`,
        text: `Hi there, this email was automatically sent by us`
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          throw error;
        } else {
          console.log("Email successfully sent!");
        }
      });
  }

app.listen("3128");