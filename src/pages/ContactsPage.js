import React from "react";
import ContactsService from "../services/ContactsServices";
import NavBar from "../components/NavBar";
import ContactsList from "../components/ContactsList";

export default class ContactsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: []
    };

    this.getContacts();
  }

  getContacts() {
    ContactsService.getContacts()
      .then(response => {
        this.setState({ contacts: response.data });
      })
      .catch();
  }

  render() {
    const { contacts } = this.state;
    return (
      <div>
        <NavBar />
        <ContactsList contacts={contacts} />
      </div>
    );
  }
}
