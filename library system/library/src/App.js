import React from "react";
import BottomBar from "./components/BottomBar/BottomBar";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import Login from "./components/Login/Login";
import "./App.css";

export default function App() {
  return (
    <div className="bar">
      <div className="foo">
        <HeaderBar />
        <BottomBar />
        <Login />
      </div>
    </div>
  );
}
