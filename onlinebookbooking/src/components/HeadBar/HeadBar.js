import React from "react";
import "./HeadBar.css";
import { Link } from "react-router-dom";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HeadBar() {
  return (
    <>
      <div className="Nav">
        <Link className="NavLogo" to="/">
          <FontAwesomeIcon icon={faBook} size="3x" />
        </Link>
        <div className="Bars" />
        <div className="NavMenu">
          <Link className="NavLink" to="/ksiazki">
            Książki
          </Link>
          <Link className="NavLink" to="/rezerwacje">
            Rezerwacje
          </Link>
          <Link className="NavLink" to="/kontakt">
            Kontakt
          </Link>
          <Link className="NavLink" to="/informacje">
            Informacje
          </Link>
        </div>
        <div className="NavBtn">
          <Link className="NavBtnLink" to="/zalogujsie">
            Zaloguj się
          </Link>
        </div>
      </div>
    </>
  );
}