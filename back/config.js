module.exports = {
  port: 3000,
  jwtSecret: "!!CryptoCat@!!",
  //   jwtExpirationInSeconds: 60 * 60, // 1 hour
  jwtExpirationInSeconds: 60, // 1 minute dev
  roles: {
    USER: "user",
    ADMIN: "admin",
    SUPER: "super",
  },
};
