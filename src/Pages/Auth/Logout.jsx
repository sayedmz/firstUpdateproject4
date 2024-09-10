import React from "react";
import { LOGOUT } from "../../Api/Api";
import { Axios } from "../../Api/axios";
const Logout = () => {
  // //cookie
  // const cookie = Cookie();
  // const token = cookie.get("commerce");
  // const res = await axios.get(`${baseURL}/${LOGOUT}`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  async function handleLogout() {
    try {
      const res = await Axios.get(`/${LOGOUT}`);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  return <button onClick={handleLogout}>Logout Page</button>;
};

export default Logout;
