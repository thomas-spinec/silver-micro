const UserModel = require("../models/User");
const ManagerModel = require("../models/Manager");
const { roles } = require("../../config");
module.exports = {
  isUserConnectedSuperAdmin: (role) => {
    return (req, res, next) => {
      const {
        user: { userId },
      } = req;
      console.log("userId", userId);
      UserModel.findUser({ id: userId }).then((user) => {
        const userRole = user.role;

        // IF user has not the role
        if (userRole !== role) {
          return;
        }
        next();
      });
    };
  },

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

        const userRole = user.dataValues.role;

        // IF user does not possess the required role
        // THEN return forbidden error
        if (userRole !== role && userRole !== "super") {
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

  isStaffFromThisRestaurant: (role) => {
    return (req, res, next) => {
      const {
        user: { userId },
        params: { restaurantId },
      } = req;

      // isUserConnectedSuperAdmin(roles.SUPER);

      ManagerModel.findManager({
        userId: userId,
        restaurantId: req?.body?.restaurantId ?? restaurantId,
      })
        .then((manager) => {
          if (manager === null) {
            return res.status(403).json({
              status: false,
              error: `You are not part of the staff.`,
            });
          }
          const managerRole = manager.dataValues.role;

          // IF user has not the role
          // THEN return forbidden error
          if (managerRole !== role) {
            return res.status(403).json({
              status: false,
              error: `You need to be ${role} to access this endpoint. You are ${managerRole}.`,
            });
          }
          req.manager = manager;
          next();
        })
        .catch((err) => {
          console.log("err", err);
          return res.status(403).json({
            status: false,
            error: `111You are not part of the staff.`,
          });
        });
    };
  },

  isThisStaffPatron: (role) => {
    return async (req, res, next) => {
      const {
        user: { userId },
        params: { restaurantId },
      } = req;

      let manager;

      try {
        if (req.params.managerId) {
          manager = await ManagerModel.findManagerById(req.params.managerId);
        } else {
          manager = await ManagerModel.findManager({
            userId: userId,
            restaurantId: restaurantId,
          });
        }
        if (manager === null) {
          return res.status(403).json({
            status: false,
            error: `He is not part of the staff.`,
          });
        }
        const managerRole = manager.dataValues.role;

        // IF user has not the role
        // THEN return forbidden error
        if (managerRole === role) {
          return res.status(403).json({
            status: false,
            error: `You can't delete a patron.`,
          });
        }
        req.manager = manager;
        next();
      } catch (err) {
        console.log("err", err);
        return res.status(400).json({
          status: false,
          error: `An error occured.`,
        });
      }
    };
  },
};
