import React from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import TodoList from "./components/TodoList";

class App extends React.Component {
  render() {
    const { todoTasks } = this.props;
    return (
      <div className="appContainer">
        <AppHeader appTitle={"To-Do List"} />
        <div className="card card-body my-4">
          <TodoList todoLists={todoTasks} />
        </div>
      </div>
    );
  }
}
export default App;
