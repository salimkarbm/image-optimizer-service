export type EmailMessageOptions = {
  to: string;
  from?: string;
  subject: string;
  html?: string;
  text?: string;
  attachments?: any;
};
interface EmailTemplate {
  firstName: string;
  appName: string;
  appTagline: string;
  teamName: string;
  helpUrl: string;
  companyAddress: string;
}

export type SendEmailOptions = Partial<EmailTemplate> & {
  otp?: string | number;
  expiryMinutes?: number;
  dashboardUrl?: string;
  unsubscribeUrl?: string;
};

export type signupEmailOptions = Omit<
  EmailTemplate,
  'companyAddress' | 'helpUrl'
> & {
  expiryMinutes: number;
  otp: string | number;
};

export type welcomeEmailOptions = EmailTemplate & {
  dashboardUrl?: string;
  unsubscribeUrl?: string;
};
export type resetPasswordEmailOptions = Omit<
  EmailTemplate,
  'dashboardUrl' | 'unsubscribeUrl'
> & {
  resetPasswordUrl: string;
  expiryMinutes: number;
  otp: string | number;
};
