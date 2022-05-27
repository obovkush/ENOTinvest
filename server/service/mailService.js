const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активация аккаунта на портале ENOTINVEST`,
      text: '',
      html: `
                    <div>
                    <h2>Активация аккаунта на портале ENOTINVEST</h2>
                        <h2>Здравствуйте! Если вы получили это письмо, значит ваш email был использован для регистрации на портале ENOTINVEST. Для активации аккаунта перейдите по ссылке</h2>
                        <a href="${link}">${link}</a>
                        </br>
                        </br>
                        С уважением, команда ENOTINVEST.
                    </div>
                `,
    });
  }
}

module.exports = new MailService();
