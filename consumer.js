const Queue = require('bull');
var dataModels = require('./data_models')
var invoiceCreator = require('./create_invoice')
const nodemailer = require('nodemailer');
const sendMailQueue = new Queue('sendMail', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: 'root'
  }
});

sendMailQueue.process(async job => { 
    var invoice = dataModels.invoice;
    invoice.shipping.name = job.data.invoice_details.name;
    invoice.invoice_nr = job.data.invoice_details.id;

    invoiceCreator.createInvoice(invoice,"invoice.pdf")

    return await sendMail(job.data.invoice_details.email); 
});

function sendMail(email) {
    return new Promise((resolve, reject) => {
        let mailOptions = {
        from: 'test1234@gmail.com',
        to: email,
        subject: 'Your invoice from SolarCloud',
        text: "This email is from SolarCloud.",
        attachments: [{
            filename: 'invoice.pdf',
            path: __dirname + '/invoice.pdf',
            contentType: 'application/pdf'
          }],
        };
        let mailConfig = {
        service: 'gmail',
        auth: {
            user: 'test1234@gmail.com',
            pass: 'test1234'
        },
        };
        nodemailer.createTransport(mailConfig).sendMail(mailOptions, (err, info) => {
        if (err) {
            reject(err);
        } else {
            resolve(info);
        }
        });
    });
}

exports.sendMailQueue = sendMailQueue