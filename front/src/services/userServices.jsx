const PATH = import.meta.env.VITE_PATH;

export const userActions = {
  //REGISTER
  async register(user) {
    try {
      const response = await fetch(`${PATH}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  //LOGIN
  async login(user) {
    try {
      const response = await fetch(`${PATH}/login`, {
        method: "POST",
        body: user,
      });
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
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
