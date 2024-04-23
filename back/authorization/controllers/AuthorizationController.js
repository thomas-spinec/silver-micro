const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserModel = require("../../common/models/User");

const { roles, jwtSecret, jwtExpirationInSeconds } = require("../../config");

// ========================> TOKEN GENERATION
const generateToken = (userMail, userId) => {
  return jwt.sign(
    {
      userId,
      userMail,
    },
    jwtSecret,
    {
      expiresIn: jwtExpirationInSeconds,
    }
  );
};

// ========================> encrypt PASSWORD
// using default method of crypto module
const encryptPassword = (password) => {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  //get the encrypted password in hexadecimal format
  return hash.digest("hex");
};

// ========================> EXPORT

module.exports = {
  register: (req, res) => {
    const payload = req.body;

    let encryptedPassword = encryptPassword(payload.password);

    UserModel.createUser(
      Object.assign(payload, { password: encryptedPassword, role: roles.USER })
    )
      .then((user) => {
        // generate token for the user
        // wich will be used in every subsequent request
        const accessToken = generateToken(payload.email, user.id);

        return res.status(201).json({
          status: true,
          data: {
            user: user.toJSON(),
            token: accessToken,
          },
        });
      })
      .catch((err) => {
        if (err.name === "SequelizeUniqueConstraintError") {
          return res.status(401).json({
            status: false,
            error: {
              type: "unique_constraint_error",
              message: "L'email est déjà utilisé",
            },
          });
        } else {
          return res.status(500).json({
            status: false,
            error: err,
          });
        }
      });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    UserModel.findUser({ email })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            status: false,
            error: {
              message: "User not found",
            },
          });
        }

        const encryptedPassword = encryptPassword(password);

        if (user.password !== encryptedPassword) {
          return res.status(400).json({
            status: false,
            error: {
              message: "Invalid email or password",
            },
          });
        }

        // generate token for the user
        // wich will be used in every subsequent request
        const accessToken = generateToken(email, user.id);

        return res.status(200).json({
          status: true,
          data: {
            user: user.toJSON(),
            token: accessToken,
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
};
