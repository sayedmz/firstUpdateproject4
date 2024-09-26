import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { USER, USERS, baseURL } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";

import axios from "axios";
import { Axios } from "../../Api/axios";
import Error403 from "./403";

const RequireAuth = ({ allowedRole }) => {
  const Navigate = useNavigate();
  const [user, setUsers] = useState("");
  // console.log("user", user);
  const cookie = Cookie();
  const token = cookie.get("commerce");

  //user
  useEffect(() => {
    axios
      .get(`${baseURL}/${USER}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      // Axios.get(`/${USER}`)
      .then((data) => setUsers(data.data))
      .catch(() => Navigate("/login", { replace: true }));
  }, []);

  // console.log("token", token);
  // console.log("user", user);
  // console.log("cookie", cookie);
  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Error403 role={user.role} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
};

export default RequireAuth;
