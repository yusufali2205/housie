import React from "react";
import Board from "./components/Board";
import ReactDOM from "react-dom";

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Board />, wrapper) : false;
