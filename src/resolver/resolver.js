import nodemailer from "nodemailer";

async function sendEmail(email, subject, message) {
  let response;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  let mailOptions = {
    from: email,
    to: "syedirtaza561@gmail.com",
    subject: subject,
    html: message,
  };
  await transporter
    .sendMail(mailOptions)
    .then((data) => {
      console.log("data ", data);
      response = true;
    })
    .catch((err) => {
      console.log("err ", err);
      response = false;
    });
  return response;
}

export default {
  Mutation: {
    async contactUs(parent, args, context, info) {
      try {
        const {
          firstName,
          lastName,
          email,
          contactNumber,
          officeAddress,
          emailMessage,
        } = args.input;

        console.log({
          firstName,
          lastName,
          email,
          contactNumber,
          officeAddress,
          emailMessage,
        });
        let subject = "Support Email";
        let message = `Email from ${firstName} ${lastName} contact number : ${contactNumber} officeAddress : ${officeAddress} emailBody : ${emailMessage}`;

        const response = await sendEmail(email, subject, message);
        console.log("response from node mailer is ");
        console.log(response);
      } catch (err) {
        console.log("contact us mutation error");
        console.log(err);
        return {
          contactUs: {
            success: false,
            message: `Server Error ${err}`,
            status: 500,
          },
        };
      }
    },
  },
};
