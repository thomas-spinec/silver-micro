const { DataTypes } = require("sequelize");
const RestaurantModel = require("./Restaurant");
const UserModel = require("./User");

const BookingModel = {
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
  bookingDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  bookingTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  numberOfGuests: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

module.exports = {
  initialize: (sequelize) => {
    const User = sequelize.define("user", UserModel.getModel());
    const Restaurant = sequelize.define(
      "restaurant",
      RestaurantModel.getModel()
    );
    this.model = sequelize.define("booking", BookingModel);
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

  createBooking: (booking) => {
    return this.model.create(booking);
  },

  findBooking: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateBooking: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllBookings: (query) => {
    return this.model.findAll({
      where: query,
    });
  },
};
