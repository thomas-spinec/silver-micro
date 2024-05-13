module.exports = {
  port: 3000,
  jwtSecret: "!!CryptoCat@!!",
  jwtExpirationInSeconds: 60 * 60, // 1 hour dev
  // jwtExpirationInSeconds: 60 * 30, // 30 minutes prod
  roles: {
    USER: "user",
    ADMIN: "admin",
    SUPER: "super",
    PATRON: "patron",
    RESPONSABLE: "responsable",
  },
};
