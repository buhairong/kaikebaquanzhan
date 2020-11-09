const {Service} = require('egg')
const nodemailer = require('nodemailer')

const userEmail = "buhairong2014@126.com"
const transporter = nodemailer.createTransport({
  service: "126",
  secureConnection: true,
  auth: {
    user: userEmail,
    pass: "CYZYMGSUZCXHIPCQ"
  }
})


class ToolService extends Service {
  async sendMail(email, subject, text, html) {
    console.log(email, subject, html)
    const mailOptions = {
      from: userEmail,
      cc: userEmail,
      to: email,
      subject,
      text,
      html
    }

    try{
      await transporter.sendMail(mailOptions)
      return true
    }catch(e) {
      console.log("email error:", e)
      return false
    }
  }
}

module.exports = ToolService