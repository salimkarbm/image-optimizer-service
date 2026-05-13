export type EmailMessageOptions = {
  to: string;
  from?: string;
  subject: string;
  html?: string;
  text?: string;
  attachments?: any;
};

export type sendEmail = {
  firstName: string;
  email?: string;
  otp?: string;
  expiryTime?: number;
  appName?: string;
  appTagline?: string;
  teamName?: string;
};
