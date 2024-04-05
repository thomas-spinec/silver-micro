const RestaurantModel = require("../../common/models/Restaurant");

module.exports = {
  // ========================> CREATE RESTAURANT
  createRestaurant: (req, res) => {
    const { body: payload } = req;

    RestaurantModel.createRestaurant(payload)
      .then((restaurant) => {
        return res.status(201).json({
          status: true,
          data: restaurant.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  // ========================> GET RESTAURANT
  getRestaurant: (req, res) => {
    const { restaurantId } = req.params;

    RestaurantModel.findRestaurant({ id: restaurantId })
      .then((restaurant) => {
        return res.status(200).json({
          status: true,
          data: restaurant.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  // ========================> UPDATE RESTAURANT
  updateRestaurant: (req, res) => {
    const {
      params: { restaurantId },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the restaurant.",
        },
      });
    }

    RestaurantModel.updateRestaurant({ id: restaurantId }, payload)
      .then((restaurant) => {
        return res.status(200).json({
          status: true,
          data: restaurant.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  // ========================> GET ALL RESTAURANTS
  getAllRestaurants: (req, res) => {
    RestaurantModel.findAllRestaurants()
      .then((restaurants) => {
        return res.status(200).json({
          status: true,
          data: restaurants.map((restaurant) => restaurant.toJSON()),
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
