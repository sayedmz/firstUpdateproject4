import React, { useContext, useEffect, useState } from "react";
import "./bars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "../../Context/WindowContext";
import { Axios } from "../../Api/axios";
import { USER } from "../../Api/Api";
import { links } from "./NavLink";
const SideBar = () => {
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  const window = useContext(WindowSize);
  const widthWindow = window.windowSize;
  const Navigate = useNavigate();
  const [user, setUsers] = useState("");
  //user
  useEffect(() => {
    Axios.get(`/${USER}`)

      .then((data) => setUsers(data.data))
      .catch(() => Navigate("/login", { replace: true }));
  }, []);

  // console.log("widthWindow", widthWindow);
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(251, 207, 95,0.7)",
          display: widthWindow < "768" && isOpen ? "block" : "none",
        }}
      ></div>
      <div
        className="side-bar pt-3"
        style={{
          left: widthWindow < "768" ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen ? "240px" : "fit-content",
          position: widthWindow < "768" ? "fixed" : "sticky",
        }}
      >
        <>
          {links.map(
            (link, key) =>
              link.role.includes(user.role) && (
                <NavLink
                  key={key}
                  to={link.path}
                  className="d-flex align-items-center gap-2 side-bar-link"
                >
                  <FontAwesomeIcon icon={link.icon} />
                  <p
                    className="m-0"
                    style={{
                      display: isOpen ? "block" : "none",
                    }}
                  >
                    {link.name}
                  </p>
                </NavLink>
              )
          )}
        </>
      </div>
    </>
  );
};

export default SideBar;
