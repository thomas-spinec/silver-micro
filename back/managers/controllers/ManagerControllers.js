const ManagerModel = require("../../common/models/Manager");
const UserModel = require("../../common/models/User");
module.exports = {
  // ========================> GET ALL MANAGERS
  getAllManagers: (req, res) => {
    ManagerModel.findAllManagers({ restaurantId: req.params.restaurantId })
      .then((managers) => {
        res.status(200).json(managers);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // ========================> CREATE MANAGER

  createManager: async (req, res) => {
    // check if for this restaurant there is already a manager with this userId

    const user = await UserModel.findUser({
      id: req.body.userId,
    });

    if (user == null) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    if (
      (await ManagerModel.findManager({
        userId: req.body.userId,
        restaurantId: req.body.restaurantId,
      })) == null
    ) {
      try {
        ManagerModel.createManager(req.body)
          .then((manager) => {
            res.status(201).json(manager);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } catch (err) {
        res.status(400).json({
          message: "Error in creating manager",
        });
      }
    } else {
      res.status(400).json({ message: "Manager already exists" });
    }
  },

  // ========================> UPDATE MANAGER

  updateManager: (req, res) => {
    ManagerModel.updateManager(req.body)
      .then((manager) => {
        res.status(200).json(manager);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // ========================> DELETE MANAGER

  deleteManager: (req, res) => {
    console.log("delete manager");

    ManagerModel.deleteManager({ id: req.params.managerId })
      .then((manager) => {
        res.status(200).json(manager);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
};
