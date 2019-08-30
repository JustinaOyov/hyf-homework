import React, { Component } from "react";
import { DatePicker } from "@material-ui/pickers";
import AddIcon from "@material-ui/icons/Add";
import {
  TextField,
  FormControl,
  Paper,
  Button,
  ButtonGroup
} from "@material-ui/core";

export default class AddTodoForm extends Component {
  render() {
    const {
      onTodoInputChange,
      onDateInputChange,
      onAddFormSubmit,
      onCancel
      //date
    } = this.props;
    return (
      <Paper className="container-flex mt-2 ml-1 col-10 col-md-6 ">
        <FormControl className="mb-2" style={{ marginLeft: 12, padding: 2 }}>
          <TextField
            name="description"
            label="Description"
            placeholder="Add something to do..."
            onChange={onTodoInputChange}
            type="text"
            margin="normal"
          />
          <DatePicker
            className="mt-2"
            name="deadline"
            label="Deadline"
            format={"YYYY-MM-DD"}
            onChange={date => onDateInputChange(date)}
            autoOk={false}
            clearable
            //value={date}
            animateYearScrolling={false}
            InputProps={{
              disableUnderline: false
            }}
          />
          <ButtonGroup className="mt-2" size="small" aria-label="actions">
            <Button
              type="submit"
              onClick={e => onAddFormSubmit(e)}
              aria-label="save"
              style={{ color: "white", backgroundColor: "grey", margin: 1 }}
            >
              <AddIcon fontSize="small" style={{ marginRight: 3 }} /> Add
            </Button>
            <Button
              onClick={e => onCancel(e)}
              aria-label="cancel"
              style={{ color: "white", backgroundColor: "grey", margin: 1 }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </FormControl>
      </Paper>
    );
  }
}
