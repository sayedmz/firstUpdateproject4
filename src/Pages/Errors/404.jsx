// src/components/NotFound.js
import React from "react";
import "./404.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="error-code">404</h1>
        <p className="error-message">Access Denied</p>
        <p className="description">
          The page you are looking for does not exist.
        </p>
        <Link className="btn-primary link404" to={"/"}>
          GO To Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
