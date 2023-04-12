import React from "react";
import "../Login/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

function Login() {
  console.log("hello!");

  const reqBody = {
    firstName: "micha",
    lastName: "michowa",
    username: "michaa",
    email: "micha@micha.eu",
    password: "micha",
  };

  fetch("/api/auth/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(reqBody),
  })
    .then((response) => console.log(response))
    .then((data) => console.log(data));

  return (
    <div className="container">
      <div className="loginForm">
        <div className="tytul">
          <span>Login Form</span>
        </div>
        <form action="#">
          <div className="row">
            <i>
              <FontAwesomeIcon icon={faEnvelope} />
            </i>
            <input
              type="text"
              placeholder="Email"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "E-mail")}
              required
            ></input>
          </div>
          <div className="row">
            <i>
              <FontAwesomeIcon icon={faKey} />
            </i>
            <input
              type="password"
              placeholder="Haslo"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Hasło")}
              required
            ></input>
          </div>
          <div className="pass">
            <a href="/przypomnijHaslo">Zapomniałeś hasła?</a>
          </div>
          <div className="row button">
            <input type={"submit"} value="Login" />
          </div>
          <div className="signup-link">
            {" "}
            Nie masz konta?
            <a href="/rejestracja"> Zarejestruj się!</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
