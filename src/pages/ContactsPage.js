import React from "react";
import { Link } from "react-router-dom";

export default class ContactsPage extends React.Component {
  render() {
    return (
      <div>
        ContactsPage
        <Link to="/" className=" button">
          <span className="icon">
            <i className="fa fa-arrow-left" />
          </span>
          <span>Back</span>
        </Link>
      </div>
    );
  }
}
