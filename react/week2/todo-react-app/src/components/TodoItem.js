import React from "react";
import "./Component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

class TodoItem extends React.Component {
  render() {
    const {
      todoItem,
      id,
      isDone,
      onToggleTodoHandler,
      onDeleteTodoHandler
    } = this.props;

    const style = isDone
      ? { color: "#b8b8b8", textDecoration: "line-through" }
      : { textDecoration: "none" };

    return (
      <li className="list-group-item form-comtrol todoItem mb-2" style={style}>
        <div className="ml-2 justify-content-between input-group-prepend ">
          <input
            className="form-check-input todoItem"
            type="checkbox"
            defaultChecked={isDone}
            onChange={() => onToggleTodoHandler(id)}
          />

          <span>{todoItem.description}</span>

          <span
            className="text-danger todoItem"
            onClick={() => onDeleteTodoHandler(id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>
      </li>
    );
  }
}
export default TodoItem;
