import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

const todoTasks = [
  {
    id: 1,
    task: "Get out of bed",
    dueDate: "Daily @ 6.30am"
  },
  {
    id: 2,
    task: "Brush teeth",
    dueDate: "Daily after coffee"
  },
  {
    id: 3,
    task: "Eat breakfast",
    dueDate: "Daily @ 8.30am"
  },
  {
    id: 4,
    task: "Do Grocery Shopping",
    dueDate: "Every Friday "
  },
  {
    id: 5,
    task: "Attend HYF React Class",
    dueDate: "Every Sunday"
  },
  {
    id: 6,
    task: "Go to the Gym",
    dueDate: "Every Tuesday"
  }
];

ReactDOM.render(<App todoTasks={todoTasks} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
