export const users = {
  standard: {
    username: "apex_user",
    password: "Password123!",
    displayName: "Apex User",
  },
  unregistered: {
    username: "unregistered",
    password: "Password123!",
  },
  twoFactor: { 
    username: "apex_2fa", 
    password: "Password2FA!", 
    otp: "123456" 
  },
} as const;
