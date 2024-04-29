const UserModel = require("../models/User");

module.exports = {
  has: (role) => {
    return (req, res, next) => {
      const {
        user: { userId },
      } = req;

      UserModel.findUser({ id: userId }).then((user) => {
        // IF user does not exist in our database, means something is fishy
        // THEN we will return forbidden error and ask user to login again
        if (!user) {
          return res.status(403).json({
            status: false,
            error: "Invalid access token provided, please login again.",
          });
        }

        const userRole = user.role;

        // IF user does not possess the required role
        // THEN return forbidden error
        if (userRole !== role) {
          return res.status(403).json({
            status: false,
            error: `You need to be ${role} to access this endpoint.`,
          });
        }

        next();
      });
    };
  },
  // methode pour vérifier si l'utilisateur supprimé est un super admin
  // si oui, on ne peut pas le supprimer
  // sinon, on continue
  isSuperAdmin: (role) => {
    return (req, res, next) => {
      const {
        params: { userId },
      } = req;

      UserModel.findUser({ id: userId }).then((user) => {
        const userRole = user.role;

        // IF user is super admin
        // THEN return forbidden error
        if (userRole === role) {
          return res.status(403).json({
            status: false,
            error: `You are not authorized to perform this action.`,
          });
        }

        next();
      });
    };
  },
};
