const nodemailer = require("nodemailer");

// sendLinkToEmail() function takes an object(data) as the parameter
// the object argument is passed by the controller that generates the password reset token
const sendLinkToEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "lifencreatives@gmail.com",
      pass: process.env.EMAIL_P,
    },
  });

  const emailInfo = await transporter.sendMail({
    from: "Lifen Creatives '<lifencreatives@gmail.com>'",
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  });
};

module.exports = sendLinkToEmail;
