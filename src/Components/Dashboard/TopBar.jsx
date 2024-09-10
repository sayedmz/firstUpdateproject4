import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import Logout from "../../Pages/Auth/Logout";
import { LOGOUT, USER, baseURL } from "../../Api/Api";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Axios } from "../../Api/axios";

const TopBar = () => {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;

  const cookie = Cookie();
  const token = cookie.get("commerce");
  const [name, setName] = useState("");
  const Navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${baseURL}/${USER}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((data) => setName(data.data.name))
      .catch(() => Navigate("/login", { replace: true }));
  }, []);

  async function handleLogout() {
    try {
      const res = await axios.get(`${baseURL}/${LOGOUT} `, {
        headers: { Authorization: `Bearer ${token}` },
      });
      cookie.remove("commerce");
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="top-bar d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-4">
        <h3>E-Commerce</h3>
        <FontAwesomeIcon
          onClick={() => setIsOpen((prev) => !prev)}
          cursor={"pointer"}
          icon={faBars}
        />
      </div>
      <div>
        <DropdownButton
          variant="warning"
          id="dropdown-basic-button"
          title={name}
        >
          <Dropdown.Item onClick={handleLogout}>Login</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
};

export default TopBar;
