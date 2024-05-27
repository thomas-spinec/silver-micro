import instance from "./config";

export const restaurantActions = {
  //CREATE
  async create(restaurant) {
    try {
      const response = await instance.post(
        "/restaurant/create",
        JSON.stringify(restaurant)
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },
  //UPDATE
  async update(restaurant) {
    try {
      const response = await instance.put(
        "/restaurant/update",
        JSON.stringify(restaurant)
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },
  //DELETE
  async delete(restaurant) {
    try {
      const response = await instance.delete("/restaurant/delete", {
        data: JSON.stringify(restaurant),
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },
  //FIND
  async find(restaurant) {
    try {
      const response = await instance.post(
        "/restaurant/find",
        JSON.stringify(restaurant)
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },
  //FIND BY ID
  async findById(restaurantId) {
    try {
      const response = await instance.get("/restaurant/find/" + restaurantId);
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },

  // GET ALL RESTAURANTS (S'IL Y A UNE RECHERCHE PAR NOM OU VILLE)
  async getAllRestaurants(restaurant) {
    try {
      const response = await instance.get("/restaurant/all", {
        params: restaurant,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },

  // GET ALL CITIES
  async getAllCities() {
    try {
      const response = await instance.get("/restaurant/allCities");
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },

  // GET RESTAURANTS BY CITY
  async getRestaurantsByCity(city) {
    try {
      const response = await instance.get("/restaurant/byCity/" + city);
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },
};
