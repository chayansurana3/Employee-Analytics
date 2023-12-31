import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function NavBar() {

  return (
    <div className="navbar">
      <div className="brand">
        <Link to="/" id="brand-title">
          ANALYTICS
        </Link>
      </div>
      <div className="links">
        <Link to="/list">EMPLOYEE LIST</Link>
        <Link to="/details">EMPLOYEE DETAILS</Link>
        <Link to="/form/:">EMPLOYEE FORM</Link>
      </div>
      <div className="dropdown">
        <button className="dropbtn">
          <hr></hr>
          <hr></hr>
          <hr></hr>
        </button>
        <div className="dropdown-content">
          <Link to="/list">EMPLOYEE LIST</Link>
          <Link to="/details">EMPLOYEE DETAILS</Link>
          <Link to="/form/:">EMPLOYEE FORM</Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;