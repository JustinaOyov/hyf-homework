import React from "react";
import "./App.css";
import tasks from "./tasks";
import AppHeader from "./components/AppHeader";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

class App extends React.Component {
  state = {
    // set initial state
    todos: [],
    newTodo: {}
  };

  componentDidMount = () => {
    //get saved todos from local storage
    const todos = localStorage.getItem("todos"); // returns a string
    if (!todos || todos === null || (todos && todos.length <= 2)) {
      // get initial state & save to local storage
      this.setState(
        {
          todos: tasks
        },
        () => {
          localStorage.setItem("todos", JSON.stringify(this.state.todos));
        }
      );
    } else {
      // get saved todos from local storage - json format (objects)
      const savedTodos = JSON.parse(todos);
      this.setState(
        {
          todos: savedTodos
        },
        () => localStorage.setItem("todos", JSON.stringify(this.state.todos))
      );
    }
  };

  // add new task to do handler  & save to local storage
  addTodoHandler = async todo => {
    const newTask = {
      id: this.state.todos.length + 1,
      description: todo,
      done: false
    };
    // update todo list with new task  & save to local storage
    const updatedTasks = [...this.state.todos, newTask];
    await this.setState({
      todos: updatedTasks
    });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };

  //delete todo handler  & save updated list to local storage
  deleteTodoHandler = id => {
    const updatedTodoList = this.state.todos.filter(todo => todo.id !== id);
    this.setState(
      {
        todos: updatedTodoList
      },
      () => {
        localStorage.setItem("todos", JSON.stringify(this.state.todos));
      }
    );
  };

  // toggle todo isDone handler  & update local storage
  toggleTodoHandler = id => {
    this.setState(
      {
        todos: this.state.todos.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              done: !todo.done
            };
          }
          return todo;
        })
      },
      () => {
        localStorage.setItem("todos", JSON.stringify(this.state.todos));
      }
    );
  };

  render() {
    return (
      <div className="container-flex appContainer">
        <AppHeader appTitle={"To-Do List"} />
        <div className="container">
          <div className="col-8 col-md-9">
            <AddTodoForm onAddFormSubmit={this.addTodoHandler} />
            <TodoList
              todoList={this.state.todos}
              onToggleTodoHandler={this.toggleTodoHandler}
              onDeleteTodoHandler={this.deleteTodoHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
