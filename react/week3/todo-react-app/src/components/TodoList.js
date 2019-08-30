import React from "react";
import "./Component.css";
import TodoItem from "./TodoItem";
import { List, ListItem, ListItemText, Paper } from "@material-ui/core";

class TodoList extends React.Component {
  render() {
    const {
      todoList,
      onToggleTodoHandler,
      onDeleteTodoHandler,
      onHandleEditInputChange,
      onHandleEditDateChange,
      onDoneEditingHandler,
      onCancelEditingHandler,
      onToggleEditModeHandler,
      isEditFormShow,
      editFormDisable
    } = this.props;

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
          onToggleEditModeHandler={() => onToggleEditModeHandler(item.id)}
          onHandleEditInputChange={onHandleEditInputChange}
          onHandleEditDateChange={onHandleEditDateChange}
          onDoneEditingHandler={e => onDoneEditingHandler(e, item.id)}
          onCancelEditingHandler={() => onCancelEditingHandler(item.id)}
          isEditFormShow={isEditFormShow}
          editFormDisable={editFormDisable}
        />
      );
    });

    return (
      <div className="container-flex mt-2">
        {todoList.length ? (
          <List>{listOfTodoItems}</List>
        ) : (
          <Paper>
            <ListItem className="mb-2" >
              <ListItemText
                primary="No Item in the List!!"
                secondary="Add Something To do!"
              />
            </ListItem>
          </Paper>
        )}
      </div>
    );
  }
}
export default TodoList;

/*
style={{ overflow: 'scroll' }}
*/
