import React from "react";
import {createRoot} from "react-dom/client";

import "./index.css";

const App = () => (
  <div className="container">
    <div>Name: profile-microfrontend</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
  </div>
);

createRoot(document.getElementById("app")).render(<App />);
