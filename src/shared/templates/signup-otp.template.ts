import { sendEmail } from '../types';

export const SignupOtpTemplate = (options: sendEmail): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Verification Code</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F5F5;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F5F5F5;">
    <tr>
      <td style="padding: 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="margin: 0 auto; background-color: #FFFFFF; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="padding: 24px 24px 12px 24px; text-align: center;">
              <h1 style="color: #1A1A1A; margin: 0 0 10px 0; letter-spacing: 2px;">${options.appName}</h1>
              <p style="color: #666; font-size: 16px; margin: 0;">${options.appTagline}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px; background-color: #1A1A1A; border-radius: 10px;">
              <h2 style="color: #FFFFFF; margin: 0 0 20px 0;">Hello ${options.firstName},</h2>
              <p style="color: #CCCCCC; margin: 0 0 20px 0; line-height: 1.6;">
                Your verification code is:
              </p>
              <div style="background-color: #F0F0F0; padding: 18px; text-align: center; border-radius: 6px; margin-bottom: 20px;">
                <span style="font-size: 28px; font-weight: bold; letter-spacing: 2px; color: #1A1A1A;">${options.otp}</span>
              </div>
              <p style="color: #CCCCCC; margin: 0 0 20px 0; line-height: 1.6;">
                This code will expire in ${options.expiryTime} minutes. Please use it to verify your account.
              </p>
              <p style="color: #CCCCCC; margin: 0 0 20px 0; line-height: 1.6;">
                If you did not request this code, please ignore this email.
              </p>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
                <p style="color: #CCCCCC; margin: 0 0 10px 0;">Best regards,</p>
                <p style="color: #FFFFFF; font-weight: bold; margin: 0;">The ${options.teamName} Team</p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

export const WelcomeEmailTemplate = (options: sendEmail): string => {
  return `<h1>Welcome to Image Processor API</h1><p>Thank you for signing up, ${options.firstName}! We're excited to have you on board. If you have any questions or need assistance, feel free to reach out to our support team.</p><p>Best regards,<br/>The Image Processor Team</p>`;
};
