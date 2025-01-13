import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function DropdownMenu() {
  let {userData,Logout}=useContext(UserContext);
  return (
    <ul className="navbar-nav ms-2">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
           {userData?.userName}
        </a>
        <ul className="dropdown-menu ">  
            <li>
              <Link className="dropdown-item text-end" to="/">
              الصفحة الرئيسية لموقع طوبى
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item text-end" onClick={Logout}>تسجيل خروج</Link>
            </li>
           
        </ul>
      </li>
    </ul>
  );
}
