import "./App.css";
import HeadBar from "./components/HeadBar/HeadBar.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <HeadBar />
        </Router>
      </header>
    </div>
  );
}

export default App;
