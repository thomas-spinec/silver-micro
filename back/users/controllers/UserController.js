const UserModel = require("../../common/models/User");
const crypto = require("crypto");

// ========================> encrypt PASSWORD
// using default method of crypto module
const encryptPassword = (password) => {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  //get the encrypted password in hexadecimal format
  return hash.digest("hex");
};

module.exports = {
  // ========================> CREATE USER
  createUser: (req, res) => {
    const { body: payload } = req;

    UserModel.createUser(payload)
      .then((user) => {
        return res.status(201).json({
          status: true,
          data: user.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  // ========================> GET USER
  getUser: (req, res) => {
    const {
      user: { userId },
    } = req;

    UserModel.findUser({ id: userId })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  // ========================> UPDATE USER
  updateUser: (req, res) => {
    const {
      user: { userId },
      body: payload,
      params: { choice },
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the user.",
        },
      });
    }

    // We check if the password is correct
    if (choice === "password") {
      if (!payload.oldPassword || !payload.newPassword) {
        return res.status(400).json({
          status: false,
          error: {
            message: "Old password and new password are required",
          },
        });
      }
      UserModel.findUser({ id: userId })
        .then((user) => {
          const encryptedPassword = encryptPassword(payload.oldPassword);
          if (user.password !== encryptedPassword) {
            return res.status(400).json({
              status: false,
              error: {
                message: "Old password is incorrect",
              },
            });
          }
          const newEncryptedPassword = encryptPassword(payload.newPassword);
          UserModel.updateUser(
            { id: userId },
            { password: newEncryptedPassword }
          ).then(() => {
            return res.status(200).json({
              status: true,
            });
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            error: err,
          });
        });
    } else if (choice === "profile") {
      if (!payload.password) {
        return res.status(400).json({
          status: false,
          error: {
            message: "Password is required",
          },
        });
      }

      // on check le password
      UserModel.findUser({ id: userId })
        .then((user) => {
          const encryptedPassword = encryptPassword(payload.password);
          if (user.password !== encryptedPassword) {
            return res.status(400).json({
              status: false,
              error: {
                message: "Password is incorrect",
              },
            });
          }
          // on supprrime le password du payload;
          delete payload.password;
          UserModel.updateUser({ id: userId }, payload).then(() => {
            UserModel.findUser({ id: userId }).then((NewUser) => {
              console.log("USER", NewUser);
              return res.status(200).json({
                status: true,
                data: NewUser.dataValues,
              });
            });
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            error: err,
          });
        });
    }
  },

  deleteUser: (req, res) => {
    const {
      params: { userId },
    } = req;

    UserModel.deleteUser({ id: userId })
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfUsersDeleted: numberOfEntriesDeleted,
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getAllUsers: (req, res) => {
    UserModel.findAllUsers(req.query)
      .then((users) => {
        return res.status(200).json({
          status: true,
          data: users,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  changeRole: (req, res) => {
    const {
      params: { userId },
      body: { role },
    } = req;

    UserModel.updateUser({ id: userId }, { role })
      .then(() => {
        return UserModel.findUser({ id: userId });
      })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  //find user by email
  findUserByEmail: (req, res) => {
    const { email } = req.body;

    UserModel.findUser({ email })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
};
