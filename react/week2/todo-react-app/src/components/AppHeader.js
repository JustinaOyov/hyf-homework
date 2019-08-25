import React from "react";
import "./Component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";

class AppHeader extends React.Component {
  render() {
    const { appTitle } = this.props;

    return (
      <div className="text-capitalize App-header">
        <nav className="navbar">
          <span className="navbar-brand headerSpan">
            <FontAwesomeIcon
              icon={faListAlt}
              className="d-inline-block"
              size="lg"
              alt=""
            />
          </span>
          <span className="headerSpan">{appTitle}</span>
        </nav>
      </div>
    );
  }
}
export default AppHeader;
