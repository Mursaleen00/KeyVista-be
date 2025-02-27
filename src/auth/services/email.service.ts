import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    this.transporter.verify((error) => {
      if (error) {
        console.error('SMTP Config Error:', error);
      } else {
        console.log('SMTP Server is ready to send emails');
      }
    });
  }

  async sendOtpEmail(to: string, otp: string): Promise<void> {
    const mailOptions = {
      from: `"Real State" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Verify Your Email - OTP',
      text: `Your OTP is: ${otp}. It expires in 10 minutes.`,
      html: `<p>Your OTP is: <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
