const { DataTypes } = require("sequelize");
const { Op } = require("sequelize");

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
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "/images/default.png",
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
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

  findAllCities: () => {
    return this.model.findAll({
      attributes: ["city"],
      group: ["city"],
    });
  },

  findRestaurantsByCity: (city) => {
    return this.model.findAll({
      where: {
        city: city,
      },
    });
  },

  updateRestaurant: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllRestaurants: (query) => {
    if (query) {
      return this.model.findAll({
        where: {
          [Op.or]: {
            name: {
              [Op.like]: `%${query.name}%`,
            },

            city: {
              [Op.like]: `%${query.name}%`,
            },
          },
        },
      });
    }
    return this.model.findAll();
  },

  findAllRestaurantsByManager: (managerId) => {
    return this.model.findAll({
      include: ["managers"],
      where: {
        "$managers.userId$": managerId,
      },
    });
  },
};
