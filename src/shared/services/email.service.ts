import { EmailMessageOptions } from '../types';
import nodemailer from 'nodemailer';
import { convert } from 'html-to-text';
import { ENV_CONFIG } from '../../config';
import { SignupOtpTemplate } from '../templates';

export class EmailService {
  async nodemailerConfig(
    options: EmailMessageOptions,
  ): Promise<nodemailer.SentMessageInfo> {
    const transporter: nodemailer.Transporter = nodemailer.createTransport({
      // service: ENV_CONFIG.MAILER.NAME,
      host: ENV_CONFIG.MAILER.HOST,
      port: Number(ENV_CONFIG.MAILER.PORT),
      secure: false,
      auth: {
        user: ENV_CONFIG.MAILER.USERNAME,
        pass: ENV_CONFIG.MAILER.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // ← helps locally
      },
    });
    try {
      // send the email with nodemailer
      const result: nodemailer.SentMessageInfo =
        await transporter.sendMail(options);
      return result;
    } catch (error: any) {
      console.error('Error sending email:', error);
      if (error.response) {
        console.error(error.response.body);
      }
      throw error;
    }
  }

  private convertEmailToText = (html: string) => {
    const result: string = convert(html, {
      wordwrap: 150,
    });
    return result;
  };

  async sendEmail(
    options: EmailMessageOptions,
    template: string,
  ): Promise<nodemailer.SentMessageInfo> {
    // convert email in HTML to plain text
    const text: string = this.convertEmailToText(template);
    const msg: EmailMessageOptions = {
      to: options.to,
      from: options.from || ENV_CONFIG.MAILER.FROM,
      subject: options.subject,
      html: template,
      text,
    };
    switch (ENV_CONFIG.APP.env) {
      case 'production':
        return await this.nodemailerConfig(msg);
      case 'staging':
        return await this.nodemailerConfig(msg);
      default:
        return await this.nodemailerConfig(msg);
    }
  }

  async signupOtpEmail(
    message: EmailMessageOptions,
    otp: number,
    firstName: string,
  ): Promise<nodemailer.SentMessageInfo> {
    const template: string = SignupOtpTemplate({
      otp: otp?.toString(),
      firstName,
    });
    return await this.sendEmail(message, template);
  }

  /**
   * Attempts to send a email to the user with retry logic.
   * Returns true if sent successfully, false if all retries failed.
   */
  async retryEmail(
    message: EmailMessageOptions,
    sendMail: any,
  ): Promise<boolean> {
    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const sent = await sendMail(message);

        if (sent) {
          console.log(
            `Welcome email sent to ${message.to} on attempt ${attempt}`,
          );
          return true;
        }

        console.warn(
          `Welcome email returned false for ${message.to}, attempt ${attempt}/${maxRetries}`,
        );
      } catch (error) {
        console.error(
          `Attempt ${attempt}/${maxRetries} failed for ${message.to}:`,
          error,
        );
      }

      // Don't sleep after the last attempt
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt)); // exponential backoff
      }
    }

    console.error(
      `Failed to send welcome email to ${message.to} after ${maxRetries} attempts`,
    );
    return false; // Explicit failure
  }
}
