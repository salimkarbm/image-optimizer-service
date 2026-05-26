export const MESSAGES = () => {
  return {
    CREATED: (name: string) => `${name} created successfully`,
    UPDATED: (name: string) => `${name} updated successfully`,
    FETCHED: (name: string) => `${name} fetched successfully`,
    DELETED: (name: string) => `${name} deleted successfully`,
    VERIFIED: (name: string) => `${name} verified successfully`,
    RESENT: (name: string) => `${name} resent successfully`,
    LOGGED_IN: (name: string) => `${name} logged in successfully`,
    REFRESHED: (name: string) => `${name} refreshed successfully`,
    LOGGED_OUT: `Logged out successfully`,
    LOGGED_OUT_ALL: `Logged out from all devices successfully`,
    LOGIN: `Logged in successful`,
    SIGN_UP: `Account signed up successfully`,
    FORGOT_PASSWORD: `Password reset link sent successfully`,
    RESET_PASSWORD: `Password reset successfully`,
  };
};

export const SUCCESS_MESSAGE = MESSAGES();
