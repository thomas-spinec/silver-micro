const { DataTypes } = require("sequelize");
const RestaurantModel = require("./Restaurant");
const UserModel = require("./User");
const { Op } = require("sequelize");

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
  numberOfGuests: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
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
      onDelete: "cascade",
    });
    this.model.belongsTo(Restaurant, {
      foreignKey: "restaurantId",
      onDelete: "cascade",
    });

    User.hasMany(this.model, {
      foreignKey: "userId",
    });

    Restaurant.hasMany(this.model, {
      foreignKey: "restaurantId",
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
    const date = new Date();

    const gmtDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();

    console.log(gmtDate);
    return this.model.findAll({
      where: {
        [Op.and]: {
          userId: `${query.userId}`,

          bookingDate: {
            [Op.gt]: `${gmtDate}`,
          },
        },
      },
      order: [["bookingDate", "ASC"]],
      include: ["restaurant"],
    });
  },
};
