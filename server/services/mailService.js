const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: { user: process.env.SMTP_USER, pass: process.env.FACTOR_PASSWORD },
      secure: false,
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Accaunt activation " + process.env.API_URL,
      text: "",
      html: 
        `<div> 
            <h1>Click on link to activate</h1>
            <a href="${link}">${link}</a>
        </div>`,
    });
  }
}

module.exports = new MailService();