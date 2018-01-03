import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export default class ContactsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: []
    };

    this.getContact();
  }

  getContact() {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    Axios.get("http://localhost:8000/contacts", config)
      .then(response => {
        this.setState({ contacts: response.data });
      })
      .catch();
  }

  render() {
    const { contacts } = this.state;
    return (
      <div>
        ContactsPage
        <Link to="/" className=" button">
          <span className="icon">
            <i className="fa fa-arrow-left" />
          </span>
          <span>Back</span>
        </Link>

        {contacts.map(contact => (
          <ul key={contact.id}>
            <li>{contact.firstName} {contact.lastName}</li>
            <li>{contact.company}</li>
          </ul>
        ))}
      </div>
    );
  }
}
