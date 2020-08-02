import React from "react";
import Game from "./components/Game";
import ReactDOM from "react-dom";

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Game />, wrapper) : false;
