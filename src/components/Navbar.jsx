import React from "react";
import { Link } from "react-router-dom";
import "../assets/nav.css";
export const Navbar = () => {
  return (
    <div className="nav-container">
      <nav className="navbar">
        <ul className="nav-ul">
          <li className="nav-li">
            <Link className="nav-link" to="/">
              Student Form
            </Link>
          </li>
          <li className="nav-li">
            <Link className="nav-link" to="/studentsdata">
              Students Data
            </Link>
          </li>
          <li className="nav-li">
            <Link className="nav-link" to="/passedstudent">
              Passed Student
            </Link>
          </li>
          <li className="nav-li">
            <Link className="nav-link" to="/failedstudent">
              Failed Student
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
