import {createTransport} from "nodemailer";

const sendMail = async ({email,subject,html})=>{
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASSWORD
    }
  })


}

export default sendMail;