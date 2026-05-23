import { sendEmailOptions } from '../types';

export const WelcomeEmailTemplate = (options: sendEmailOptions): string => {
  // return `<h1>Welcome to Image Processor API</h1><p>Thank you for signing up, ${options.firstName}! We're excited to have you on board. If you have any questions or need assistance, feel free to reach out to our support team.</p><p>Best regards,<br/>The Image Processor Team</p>`;
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ${options.appName}</title>
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
              <h2 style="color: #FFFFFF; margin: 0 0 20px 0;">Welcome aboard, ${options.firstName}! 🎉</h2>
              
              <p style="color: #CCCCCC; margin: 0 0 20px 0; line-height: 1.6;">
                Thanks for signing up. Your email has been verified and your account is ready to go.
              </p>

              <p style="color: #CCCCCC; margin: 0 0 25px 0; line-height: 1.6;">
                Here’s what you can do next:
              </p>

              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 25px;">
                <tr>
                  <td style="padding: 0 0 12px 0;">
                    <p style="color: #FFFFFF; margin: 0; line-height: 1.6;">
                      <strong>1. Complete your profile</strong><br>
                      <span style="color: #CCCCCC;">Add a photo and bio so others can recognize you.</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 0 12px 0;">
                    <p style="color: #FFFFFF; margin: 0; line-height: 1.6;">
                      <strong>2. Explore the dashboard</strong><br>
                      <span style="color: #CCCCCC;">Check out your new workspace and available tools.</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="color: #FFFFFF; margin: 0; line-height: 1.6;">
                      <strong>3. Read the quick start guide</strong><br>
                      <span style="color: #CCCCCC;">Learn how to get the most out of ${options.appName}.</span>
                    </p>
                  </td>
                </tr>
              </table>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${options.dashboardUrl}" style="background-color: #FFFFFF; color: #1A1A1A; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Go to Dashboard</a>
              </div>

              <p style="color: #CCCCCC; margin: 20px 0 0 0; line-height: 1.6; font-size: 14px;">
                Need help? Reply to this email or visit our <a href="${options.helpUrl}" style="color: #FFFFFF;">Help Center</a>.
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
                You received this because you created an account. 
                <a href="${options.unsubscribeUrl}" style="color: #666;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
