import React from "react";
import "./Component.css";
import { DatePicker } from "@material-ui/pickers";
import {
  TextField,
  Checkbox,
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  Button,
  ButtonGroup,
  Paper
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";

class TodoItem extends React.Component {
  render() {
    const {
      todoItem,
      id,
      isDone,
      onToggleTodoHandler,
      onDeleteTodoHandler,
      onHandleEditInputChange,
      onHandleEditDateChange,
      onDoneEditingHandler,
      onToggleEditModeHandler,
      onCancelEditingHandler,
      isEditFormShow,
      editFormDisable
    } = this.props;
    //const deadlineDate = new Date(todoItem.deadline); //.toDateString();

    const style = isDone
      ? { color: "#b8b8b8", textDecoration: "line-through" }
      : { textDecoration: "none" };

    return (
      <Paper className="container">
        {todoItem.isEditing && isEditFormShow ? (
          <ListItem className="mb-2">
            <TextField
              name="description"
              label="Description"
              style={{ margin: 8 }}
              defaultValue={todoItem.description}
              onChange={e => onHandleEditInputChange(e)}
              type="text"
              margin="normal"
            />

            <DatePicker
              name="deadline"
              label="Deadline"
              format={"YYYY-MM-DD"}
              value={todoItem.deadline}
              onChange={onHandleEditDateChange}
              animateYearScrolling={false}
              autoOk={false}
              clearable
            />

            <ListItemSecondaryAction>
              <ButtonGroup size="small" aria-label="actions">
                <Button
                  type="submit"
                  onClick={e => onDoneEditingHandler(e, id)}
                  aria-label="save-edit"
                  style={{ margin: 1 }}
                >
                  <DoneIcon fontSize="small" style={{ marginRight: 3 }} />
                </Button>
                <Button
                  onClick={e => onCancelEditingHandler(e, id)}
                  aria-label="cancel-edit"
                  style={{ margin: 1 }}
                >
                  <CloseIcon fontSize="small" style={{ marginRight: 3 }} />
                </Button>
              </ButtonGroup>
            </ListItemSecondaryAction>
          </ListItem>
        ) : (
          <ListItem className="mb-2" style={style}>
            <ListItemIcon>
              <Checkbox
                style={{ color: "grey" }}
                onClick={onToggleTodoHandler}
                checked={isDone}
              />
            </ListItemIcon>
            <ListItemText
              primary={todoItem.description}
              secondary={`due date: ${todoItem.deadline}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                size="small"
                edge="end"
                aria-label="edit"
                style={{ margin: 2 }}
                className="text-success"
                onClick={() =>
                  isEditFormShow
                    ? editFormDisable()
                    : onToggleEditModeHandler(id)
                }
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                edge="end"
                aria-label="delete"
                style={{ margin: 2 }}
                className="text-danger"
                onClick={() => onDeleteTodoHandler(id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </Paper>
    );
  }
}
export default TodoItem;
