import instance from "./config";

export const bookingActions = {
  //CREATE
  async create(booking) {
    try {
      const response = await instance.post(
        "/booking/create",
        JSON.stringify(booking)
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },
  //READ
  async read() {
    try {
      const response = await instance.get("/booking/read");
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },
  //UPDATE
  async update(booking) {
    try {
      const response = await instance.put(
        "/booking/update",
        JSON.stringify(booking)
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },
  //DELETE
  async delete(booking) {
    try {
      const response = await instance.delete("/booking/delete", {
        data: JSON.stringify(booking),
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },
  //FIND
  async find(booking) {
    try {
      const response = await instance.post(
        "/booking/find",
        JSON.stringify(booking)
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },

  //FIND BY RESTAURANT
  async findByRestaurant(restaurantId) {
    try {
      const response = await instance.get(
        `/booking/byRestaurant/${restaurantId}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },
};
