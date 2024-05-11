const { DataTypes } = require("sequelize");

const RestaurantModel = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  maxCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

module.exports = {
  initialize: (sequelize) => {
    this.model = sequelize.define("restaurant", RestaurantModel);
  },

  getModel: () => {
    return RestaurantModel;
  },

  createRestaurant: (restaurant) => {
    return this.model.create(restaurant);
  },

  findRestaurant: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateRestaurant: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllRestaurants: (query) => {
    return this.model.findAll({
      where: query,
    });
  },
};
