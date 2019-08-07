import React from "react";
import "./Component.css";
import TodoItems from "./TodoItems";

class TodoList extends React.Component {
  render() {
    const { todoLists } = this.props;
    // map through the todos
    const listOfTasks = todoLists.map(taskItem => {
      return <TodoItems todoItem={taskItem} key={taskItem.id} />;
    });

    return (
      <div className="">
        <ul className="list-group my-3">
          <h3 className="text-capitalize text-left">Todos...</h3>
          {listOfTasks}
        </ul>
      </div>
    );
  }
}
export default TodoList;
