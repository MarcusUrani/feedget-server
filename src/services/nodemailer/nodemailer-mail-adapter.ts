import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "79436edcbe2592",
    pass: "0ac2ca19e329df",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe feedget <feedback@feedget.com>",
      to: "Marcus Urani <marcus.urani20@gmail.com>",
      subject,
      html: body,
    });
  }
}
