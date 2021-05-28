const nodeMailer = require('../config/nodemailer');

// this is another way of exporting method

exports.newComment = (comment) => {
    console.log('comment mailer');

    nodeMailer.transporter.sendMail({
        from: 'abc@gmail.com',
        to: comment.user.email,
        subject: 'New commment published',
        html: "<h1> Your comment is published </h1>"
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message Sent');
        return;
    });
}