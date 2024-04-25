import axios from "axios";
import instance from "./config";

export const userActions = {
  //REGISTER
  async register(user) {
    try {
      const response = await instance.post("/signup",JSON.stringify(user) 
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },
  //LOGIN
  async login(user) {
    try {
      const response = await instance.post("/login",JSON.stringify(user) 
    );
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },
  //LOGOUT
  async logout() {
    try {
      const response = await fetch(`${PATH}/logout`, {
        method: "GET",
      });
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  },
};
