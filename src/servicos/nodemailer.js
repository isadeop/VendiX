// const nodemailer = require("nodemailer")

// const transporter = nodemailer.createTransport({
//     host: process.env.HOST_EMAIL,
//     port: process.env.PORT_EMAIL,
//     auth: {
//       user: process.env.USER_EMAIL,
//       pass: process.env.PASS_EMAIL,
//     },
//   })

//   const enviar = (to, subject, body) => {
//     transporter.sendMail({
//         from: process.env.FROM_EMAIL,
//         to,
//         subject,
//         text : body
//     })
//   }

//   module.exports = enviar