import { resetPasswordEmailOptions } from '../types';

export const ResetPasswordEmailTemplate = (
  options: resetPasswordEmailOptions,
): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset your ${options.appName} password</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F5F5F5;">
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
              <h2 style="color: #FFFFFF; margin: 0 0 20px 0;">Password Reset Request</h2>
              
              <p style="color: #CCCCCC; margin: 0 0 20px 0; line-height: 1.6;">
                Hi ${options.firstName}, we received a request to reset your password. Use the code below to continue.
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <div style="background-color: #2A2A2A; border: 1px dashed #444; border-radius: 8px; padding: 20px; display: inline-block;">
                  <p style="color: #999; font-size: 14px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Your reset code</p>
                  <p style="color: #FFFFFF; font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 0; font-family: 'Courier New', monospace;">${options.otp}</p>
                </div>
              </div>

              <p style="color: #CCCCCC; margin: 0 0 25px 0; line-height: 1.6; text-align: center;">
                This code expires in <strong style="color: #FFFFFF;">${options.expiryMinutes} minutes</strong>.
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${options.resetPasswordUrl}" style="background-color: #FFFFFF; color: #1A1A1A; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
              </div>

              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin: 25px 0; background-color: #2A2A2A; border-radius: 6px;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="color: #FFFFFF; margin: 0 0 8px 0; font-weight: bold; font-size: 14px;">Didn't request this?</p>
                    <p style="color: #CCCCCC; margin: 0; line-height: 1.5; font-size: 14px;">
                      You can safely ignore this email. Your password won't change unless you use the code above. If you're worried, <a href="${options.helpUrl}" style="color: #FFFFFF;">contact us</a>.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color: #999; margin: 20px 0 0 0; line-height: 1.6; font-size: 13px;">
                For security, never share this code with anyone. ${options.teamName} will never ask for it.
              </p>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
                <p style="color: #CCCCCC; margin: 0 0 10px 0;">Best regards,</p>
                <p style="color: #FFFFFF; font-weight: bold; margin: 0;">The ${options.teamName} Team</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; text-align: center;">
              <p style="color: #999; font-size: 12px; margin: 0 0 8px 0;">
                ${options.companyAddress}
              </p>
              <p style="color: #999; font-size: 12px; margin: 0;">
                You received this because a password reset was requested for your account.
                <a href="${options.helpUrl}" style="color: #666;">Need help?</a>
              </p>
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
