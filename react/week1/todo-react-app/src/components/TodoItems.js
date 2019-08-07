import React from "react";
import "./Component.css";

class TodoItems extends React.Component {
  render() {
    const { todoItem } = this.props;

    return (
      <div>
        <li className="list-group-item text-capitalize d-flex justify-content-between mb-2">
          {todoItem.task}
          <span>{todoItem.dueDate}</span>
        </li>
      </div>
    );
  }
}
export default TodoItems;
