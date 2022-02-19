import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import PageRender from "./PageRender";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/:page" element={<PageRender />} />
            <Route exact path="/:page/:id" element={<PageRender />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
