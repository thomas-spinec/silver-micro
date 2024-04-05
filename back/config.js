module.exports = {
  port: 3000,
  jwtSecret: "!!CryptoCat@!!",
  //   jwtExpirationInSeconds: 60 * 60, // 1 hour
  // faire un token de 1 minute pour les tests
  jwtExpirationInSeconds: 60, // 1 minute
  roles: {
    USER: "user",
    ADMIN: "admin",
  },
};
