import React from "react";
import "./403.css"; // تأكد من أن مسار الملف صحيح
import { Link } from "react-router-dom";

const Error403 = ({ role }) => {
  return (
    <div className="forbidden-container">
      <div className="forbidden-content">
        <h1 className="error-code">403</h1>
        <p className="error-message">
          Oops! It seems you don't have permission to access this page.
        </p>
        <p className="error-suggestion">
          Please check your credentials or contact support.
        </p>
        <Link
          className="btn-primary "
          to={role === "1996" ? "/dashboard/writer" : "/"}
        >
          {role === "1996" ? "Go to Writer Page" : "go to home page"}
        </Link>
      </div>
    </div>
  );
};

export default Error403;
