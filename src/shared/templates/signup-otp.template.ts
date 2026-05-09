export const SignupOtpTemplate = (otp: string, firstName: string): string => {
  return `
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your OTP Code</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F2FEFF;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ##F2FEFF;">
    <tr>
      <td style="padding: 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="margin: 0 auto; background-color: #F6DEB3; border-radius: 10px; box-shadow: 0 2px 8px rgba(5,53,58,0.08);">
          <tr>
            <td style="padding: 24px 24px 12px 24px; text-align: center;">
              <h1 style="color: #06353A; margin: 0 0 10px 0; letter-spacing: 2px;">GUỌNỌ</h1>
              <p style="color: #425F58; font-size: 16px; margin: 0;">Your Language Learning Companion</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px; background-color: #06353A; border-radius: 10px;">
              <h2 style="color: #FFFFFF; margin: 0 0 20px 0;">Hello ${firstName},</h2>
              <p style="color: #979797; margin: 0 0 20px 0; line-height: 1.6;">
                Your OTP code is:
              </p>
              <div style="background-color: #F5DEB3; padding: 18px; text-align: center; border-radius: 6px; margin-bottom: 20px;">
                <span style="font-size: 28px; font-weight: bold; letter-spacing: 2px; color: #06353A;">${otp}</span>
              </div>
              <p style="color: #979797; margin: 0 0 20px 0; line-height: 1.6;">
                This code will expire in 15 minutes. Please use it to verify your account.
              </p>
              <p style="color: #979797; margin: 0 0 20px 0; line-height: 1.6;">
                If you did not request this OTP, please ignore this email.
              </p>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #979797; margin: 0 0 10px 0;">Best regards,</p>
                <p style="color: #FFFFFF; font-weight: bold; margin: 0;">The Guọnọ Team</p>
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

export const WelcomeEmailTemplate = (firstName: string): string => {
  return `<h1>Welcome to Image Processor API</h1><p>Thank you for signing up, ${firstName}! We're excited to have you on board. If you have any questions or need assistance, feel free to reach out to our support team.</p><p>Best regards,<br/>The Image Processor Team</p>`;
};
