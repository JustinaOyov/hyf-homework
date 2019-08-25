import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class AddTodoForm extends React.Component {
  state = {
    todoInput: ""
  };

  // Todo Input handler
  handleAddTodoChange = e => {
    e.preventDefault();
    this.setState({
      todoInput: e.target.value
    });
  };

  onAddFormSubmitHandler = e => {
    e.preventDefault();
    const { todoInput } = this.state;

    if (todoInput !== "") {
      this.props.onAddFormSubmit(todoInput);
      this.setState({
        todoInput: ""
      });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onAddFormSubmitHandler}>
          <div className="form-row mt-4">
            <div className="col">
              <input
                type="text"
                className="form-control todoInputField text-capitalize"
                placeholder="what do you want to do?"
                value={this.state.todoInput}
                onChange={this.handleAddTodoChange}
                autoFocus
              />
            </div>

            <div className="col">
              <button
                className="text-capitalize btn btn-secondary"
                type="submit"
                disabled={!this.state.todoInput}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default AddTodoForm;
