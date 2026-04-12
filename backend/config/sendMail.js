import {createTransport} from nodemailer;

const sendMail = async ({email,subject,html})=>{
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "fghjk",
      password: "fghjk"
    }
  })

  await transport.sendMail({
    from: "grefvrv",
    to: email,
    subject,
    html
  })
}

export default sendMail;