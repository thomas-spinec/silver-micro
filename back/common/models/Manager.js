const { DataTypes } = require("sequelize");
const { roles } = require("../../config");
const RestaurantModel = require("./Restaurant");
const UserModel = require("./User");

const ManagerModel = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(roles.RESPONSABLE, roles.PATRON),
    allowNull: false,
    defaultValue: roles.RESPONSABLE,
  },
};

module.exports = {
  initialize: (sequelize) => {
    const User = sequelize.define("user", UserModel.getModel());
    const Restaurant = sequelize.define(
      "restaurant",
      RestaurantModel.getModel()
    );
    this.model = sequelize.define("manager", ManagerModel);
    this.model.belongsTo(User, {
      foreignKey: "userId",
    });

    this.model.belongsTo(Restaurant, {
      foreignKey: "restaurantId",
    });

    User.hasMany(this.model, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    Restaurant.hasMany(this.model, {
      foreignKey: "restaurantId",
      onDelete: "CASCADE",
    });
  },

  getModel: () => {
    return ManagerModel;
  },

  createManager: (manager) => {
    return this.model.create(manager);
  },

  findManager: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  findManagerById: (id) => {
    return this.model.findByPk(id);
  },

  updateManager: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllManagers: (query) => {
    console.log(query);
    return this.model.findAll({
      where: query,
      include: ["user"],
    });
  },

  deleteManager: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};
