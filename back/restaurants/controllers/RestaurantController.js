const RestaurantModel = require("../../common/models/Restaurant");
const ManagerModel = require("../../common/models/Manager");
const UserModel = require("../../common/models/User");
const { roles } = require("../../config");

module.exports = {
  // ========================> CREATE RESTAURANT
  createRestaurant: (req, res) => {
    const { body: payload } = req;

    RestaurantModel.createRestaurant(payload)
      .then((restaurant) => {
        if (restaurant) {
          // create a manager
          const manager = {
            userId: req.user.userId,
            restaurantId: restaurant.id,
            role: roles.PATRON,
          };
          ManagerModel.createManager(manager)
            .then((patron) => {
              // update the user role to admin
              UserModel.updateUser(
                { id: req.user.userId },
                { role: roles.ADMIN }
              )
                .then((user) => {
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
            })
            .catch((err) => {
              return res.status(500).json({
                status: false,
                error: err,
              });
            });
          // create a manager
        }
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
        if (!restaurant) {
          return res.status(404).json({
            status: false,
            error: {
              message: "Restaurant not found",
            },
          });
        }
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
  getAllRestaurants: async (req, res) => {
    const { query: payload } = req;

    let restaurants;
    try {
      if (payload && Object.keys(payload).length > 0) {
        restaurants = await RestaurantModel.findAllRestaurants(payload);
      } else {
        restaurants = await RestaurantModel.findAllRestaurants();
      }
      if (!restaurants || restaurants.length === 0) {
        return res.status(404).json({
          status: false,
          error: {
            message: "Aucun restaurant trouvé",
          },
        });
      }

      return res.status(200).json({
        status: true,
        data: restaurants.map((restaurant) => restaurant.toJSON()),
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        error: err,
      });
    }
  },

  // ========================> GET ALL CITIES
  getAllCities: async (req, res) => {
    try {
      const cities = await RestaurantModel.findAllCities();

      if (!cities || cities.length === 0) {
        return res.status(404).json({
          status: false,
          error: {
            message: "Aucune ville trouvée",
          },
        });
      }

      return res.status(200).json({
        status: true,
        data: cities.map((city) => city.city),
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        error: err,
      });
    }
  },

  // ========================> GET RESTAURANTS BY CITY
  getRestaurantsByCity: (req, res) => {
    const { city } = req.params;

    RestaurantModel.findRestaurantsByCity(city)
      .then((restaurants) => {
        if (!restaurants || restaurants.length === 0) {
          return res.status(404).json({
            status: false,
            error: {
              message: "Aucun restaurant trouvé",
            },
          });
        }

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
