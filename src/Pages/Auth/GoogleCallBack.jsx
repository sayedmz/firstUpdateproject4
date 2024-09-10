import axios from "axios";
import React, { useEffect } from "react";
import { GOOGLE_CALL_BACK, baseURL } from "../../Api/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";
const GoogleCallBack = () => {
  const cookie = Cookie();
  const location = useLocation();
  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(
          `${baseURL}/${GOOGLE_CALL_BACK}${location.search}`
        );
        const token = res.data.access_token;
        cookie.set("commerce", token);
      } catch (err) {
        console.log(err);
      }
    }
    GoogleCall();
  }, []);
  return <div>GoogleCallBack</div>;
};

export default GoogleCallBack;
