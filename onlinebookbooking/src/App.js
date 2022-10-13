import React from "react";
import "./App.css";
import HeadBar from "./components/HeadBar/HeadBar.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login.js";
import Home from "./components/BookList/BookList.js";

function App() {
  return (
    <>
      <Router>
        <HeadBar />
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route exact path="/ksiazki" element={<Home />} />
              <Route exact path="/zalogujsie" element={<Login />} />
            </Routes>
          </header>
        </div>
      </Router>
    </>
  );
}

export default App;
