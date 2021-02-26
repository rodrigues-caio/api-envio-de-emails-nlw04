import nodemailer, { Transporter } from 'nodemailer';
import { resolve } from 'path';
import handlebars from 'handlebars';
import fs from 'fs';

class SendMailService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  async execute(to: string, subject: string, body: string) {
    // caminho do arquivo
    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');
    // leitura do arquivo
    const templateFileContent = fs.readFileSync(npsPath).toString('utf8');
    // compilação do arquivo
    const mailTemplateParse = handlebars.compile(templateFileContent);
    // passando variáveis para o arquivo
    const html = mailTemplateParse({
      name: to,
      title: subject,
      description: body,
    });
    // mandando email
    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: 'NPS <noreplay@nps.com.br>',
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();
