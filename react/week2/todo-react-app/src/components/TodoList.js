
import React from "react";
import "./Component.css";
import TodoItem from "./TodoItem";

class TodoList extends React.Component {
  render() {
    const { todoList, onToggleTodoHandler, onDeleteTodoHandler } = this.props;

    // map through the todo list
    const listOfTodoItems = todoList.map(item => {
      return (
        <TodoItem
          todoItem={item}
          id={item.id}
          key={item.id}
          isDone={item.done}
          onToggleTodoHandler={() => onToggleTodoHandler(item.id)}
          onDeleteTodoHandler={() => onDeleteTodoHandler(item.id)}
        />
      );
    });

    return (
      <div className="mt-4">
        <form className="form-group">
          <ul className="list-group">{listOfTodoItems}</ul>/>
        </form>
      </div>
    );
  }
}
export default TodoList;
