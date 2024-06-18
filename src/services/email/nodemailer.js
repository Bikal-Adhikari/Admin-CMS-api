//Email workflow
// have nodemailer installed
//create Transpoter
//sendmail

import nodemailer from "nodemailer";

const emailProcessor = async (mailBodyObj) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    const info = await transporter.sendMail(mailBodyObj);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};
// async..await is not allowed in global scope, must use a wrapper

export const emailVerificationMail = ({ email, fName, url }) => {
  const obj = {
    from: `"Tech Store 👻" <${process.env.SMTP_EMAIL}>`, // sender address
    to: email, // list of receivers
    subject: "Action Required", // Subject line
    text: `Hello there, please follow the link for verification ${url}`, // plain text body
    html: `<h1>Hello ${fName} </h1>
        <br />
        <br />
        <a href="${url}" style="padding:1rem; background: green">Verify Now</a>
        <br />
        <br />
        <br />
        <p>If the button doesn't work , Please copy the following url and paste it in your browser ${url}</p>
         <br />
        <br />
        <br />
        <p>Kind Regards,<br/>Tech Store</p>`, // html body
  };
  emailProcessor(obj);
};
