let nodemailer = require("nodemailer");

const getHtml = (email, reseturl) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }
    .email-container {
        background-color: #ffffff;
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        background-color: #007BFF;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
    }
    .footer {
        text-align: center;
        font-size: 12px;
        color: #777;
    }
</style>
</head>
<body>
<div class="email-container">
    <h1>Reset Your Password</h1>
    <p>Hi ${email.split("@")[0].split(".").join(" ")},</p>
    <p>You recently requested to reset your password for your account. Click the button below to reset it.</p>
    <a href="${reseturl}" class="button">Reset Password</a>
    <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
    <p>Thanks,<br>Godrej Indonesia Team (Assert SecureTech)</p>
    <div class="footer">
        <p>© Assert SecureTech Pvt. Ltd.</p>
    </div>
</div>
</body>
</html>`;
};
const sendmailusingnodemailer = async ({ email, resettoken }) => {
  const transport = nodemailer.createTransport({
    service: "gmail", // use your email provider
    auth: {
      user: "alpha@assertai.com", // your email
      pass: "afsbiztaopvmcouo", // your password
    },
  });

  let reseturl = `http://localhost:3000/resetpassword?token=${resettoken}`;
  // Set up email data
  const mailOptions = {
    from: "alpha@assertai.com",
    to: email,
    subject: `Password Reset Email.`,
    html: getHtml(email, reseturl),
  };

  let d = transport
    .sendMail(mailOptions)
    .then((info) => {
      return info.response;
    })
    .catch((error) => {
      return error;
    });
  return d;
};

module.exports = { sendmailusingnodemailer };
