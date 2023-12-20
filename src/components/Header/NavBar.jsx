import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import menu from "../../assets/images/menu.png";

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
        <button className="dropbtn"><img src={menu} alt="menu-img not found"/></button>
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