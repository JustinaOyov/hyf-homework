import React from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import TodoModalForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import { Button } from "@material-ui/core";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // set initial state
      todos: [],
      inputDescription: "",
      inputDeadline: "",
      done: false,
      isModalShow: false,
      addFormShow: false,
      editFormShow: false,
      editedInput: "",
      editedDate: "",
      today: moment()
        .format("YYYY-MM-DD")
        .toString()
    };
  }

  componentDidMount() {
    //get saved todos from local storage
    let todos = localStorage.getItem("todos");
    if (!todos || todos === null || (todos && todos.length <= 2)) {
      // get initial state & save to local storage
      fetch(
        "https://gist.githubusercontent.com/benna100/391eee7a119b50bd2c5960ab51622532/raw"
      )
        .then(res => res.json())
        .then(data =>
          this.setState(
            {
              todos: data.map(todo => {
                return {
                  id: todo.id,
                  description: todo.description,
                  deadline: moment(todo.deadline).format("YYYY-MM-DD"),
                  done: false,
                  isEditing: false
                };
              })
            },
            () =>
              localStorage.setItem("todos", JSON.stringify(this.state.todos))
          )
        );
    } else if (todos) {
      const savedTodos = JSON.parse(todos);
      this.setState(
        {
          todos: savedTodos
        } /*, () => console.log("from didMount ", this.state.todos)*/
      );
    }
  }

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

  addFormShowHandler = e => {
    // show add todo form
    e.preventDefault();
    this.setState(
      {
        addFormShow: !this.state.addFormShow
      } /*,() => {console.log("from addFormShow", this.state.addFormShow);}*/
    );
  };

  // handle new Todo Input
  handleTodoInputChange = e => {
    e.preventDefault();
    this.setState(
      {
        inputDescription: e.target.value
      } /*,() => console.log("from app - InputChange:", this.state.inputDescription)*/
    );
  };

  // handle new Todo date
  handleDateInputChange = date => {
    //console.log(date);
    this.setState(
      {
        inputDeadline: moment(date)
          .format("YYYY-MM-DD")
          .toString()
      } /*,() => console.log("from app - dateInput:", this.state.inputDeadline)*/
    );
  };

  // add new task to do handler  & save to local storage
  handleSubmitTodoHandler = async e => {
    e.preventDefault();
    if (this.state.inputDescription !== "" && this.state.inputDeadline !== "") {
      const newTask = {
        id: this.state.todos.length + 1,
        description: this.state.inputDescription,
        deadline: this.state.inputDeadline,
        done: false,
        isEditing: false
      };
      // update todo list with new task  & save to local storage
      const updatedTasks = [...this.state.todos, newTask];
      await this.setState({
        todos: updatedTasks,
        addFormShow: false,
        inputDescription: "",
        inputDeadline: ""
      });
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    }
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

  toggleEditModeHandler = id => {
    this.setState({
      // enable show edit form
      editFormShow: true,
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            // enable selected item 'isEditing' flag
            isEditing: true
          };
        } else {
          return {
            // disable selected item 'isEditing' flag
            ...todo,
            isEditing: false
          };
        }
        //return todo;
      })
    });
  };

  editFormDisableHandler = () => {
    // disable/close edit form
    this.setState({
      editFormShow: false,
      editedInput: "",
      editedDate: "",
      todos: this.state.todos.map(todo => {
        return {
          ...todo,
          // disable editing for all todo task
          isEditing: false
        };
      })
    });
  };

  // handle edit - Todo Input
  handleEditInputChange = e => {
    this.setState(
      {
        editedInput: e.target.value
      } /*, console.log(this.state.editedInput)*/
    );
  };

  // handle edit - Todo date
  handleEditDateChange = date => {
    this.setState(
      {
        editedDate: moment(date)
          .format("YYYY-MM-DD")
          .toString()
      } /*, () => console.log("from app - edit:", this.state.editedDate)*/
    );
  };

  doneEditingTodoHandler = async (e, editId) => {
    e.preventDefault();
    const { editedInput, editedDate } = this.state;
    const updatedTodo = this.state.todos.map(todo => {
      if (todo.id === editId) {
        todo.description = editedInput ? editedInput : todo.description;
        todo.deadline = editedDate ? editedDate : todo.deadline;
        todo.isEditing = !todo.isEditing; // reset edit flag
      }
      return todo;
    });
    // update todo list  & save to local storage
    await this.setState({
      todos: updatedTodo,
      editedInput: "",
      editedDate: "",
      editFormShow: false
    });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };

  render() {
    return (
      <div
        className="container-flex "
        style={{ backgroundColor: "#282c34", minHeight: "100vh" }}
      >
        <AppHeader appTitle={"To-Do List"} />
        <div className="container col-8 col-md-9">
          <MuiPickersUtilsProvider utils={MomentUtils}>
            {this.state.addFormShow ? (
              <TodoModalForm
                onTodoInputChange={this.handleTodoInputChange}
                onDateInputChange={this.handleDateInputChange}
                onAddFormSubmit={this.handleSubmitTodoHandler}
                onCancel={this.addFormShowHandler}
                //date={this.state.today}
              />
            ) : (
              <div className="mt-4">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: 1 }}
                  onClick={this.addFormShowHandler}
                >
                  <NoteAddIcon style={{ marginRight: 3 }} />
                  Add Todo
                </Button>
              </div>
            )}
            <TodoList
              todoList={this.state.todos}
              onToggleTodoHandler={this.toggleTodoHandler}
              onDeleteTodoHandler={this.deleteTodoHandler}
              onToggleEditModeHandler={this.toggleEditModeHandler}
              onHandleEditInputChange={this.handleEditInputChange}
              onHandleEditDateChange={this.handleEditDateChange}
              onDoneEditingHandler={this.doneEditingTodoHandler}
              onCancelEditingHandler={this.editFormDisableHandler}
              isEditFormShow={this.state.editFormShow}
              editFormDisable={this.editFormDisableHandler}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
    );
  }
}
export default App;
