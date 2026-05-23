export type EmailMessageOptions = {
  to: string;
  from?: string;
  subject: string;
  html?: string;
  text?: string;
  attachments?: any;
};

export type sendEmailOptions = {
  firstName?: string;
  email?: string;
  otp?: string;
  expiryTime?: number;
  appName?: string;
  appTagline?: string;
  teamName?: string;
  dashboardUrl?: string;
  helpUrl?: string;
  companyAddress?: string;
  unsubscribeUrl?: string;
};
