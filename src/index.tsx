import React from "react";
import  { createRoot }  from "react-dom/client";
import App from "./App";
import "./style.scss";
import "purecss";
import "./grids-responsive-min.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App/>);
