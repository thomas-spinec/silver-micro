const { DataTypes } = require("sequelize");
const { roles } = require("../../config");

const UserModel = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(roles.USER, roles.ADMIN, roles.SUPER),
    allowNull: false,
    defaultValue: roles.USER,
  },
};

// export des différentes propriétés du modèle (créate, update, delete, etc.)
module.exports = {
  initialize: (sequelize) => {
    this.model = sequelize.define("user", UserModel);
  },

  getModel: () => {
    return UserModel;
  },

  createUser: (user) => {
    return this.model.create(user);
  },

  findUser: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateUser: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllUsers: (query) => {
    return this.model.findAll({
      where: query,
    });
  },

  deleteUser: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};
