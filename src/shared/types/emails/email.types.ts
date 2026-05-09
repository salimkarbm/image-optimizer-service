export type EmailMessageOptions = {
  to: string;
  from?: string;
  subject: string;
  html?: string;
  text?: string;
  attachments?: any;
};
