import React from "react";
import ContactsService from "../services/ContactsServices";
import NavBar from "../components/NavBar";
import ContactsList from "../components/ContactsList";
import ModalDeleteContact from "../components/ModalDeleteContact";

export default class ContactsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      contacts: []
    };
    this.showModal = this.showModal.bind(this);
    this.getContacts = this.getContacts.bind(this);
    // this.reload = this.reload.bind(this);
    this.getContacts();
  }

  getContacts() {
    ContactsService.getContacts().then(response => {
      this.setState({ contacts: response.data, openModal: false });
    });
  }

  showModal(contact) {
    this.setState({ openModal: true, contact });
  }

  render() {
    const { contacts, openModal, contact } = this.state;
    return (
      <div>
        <NavBar getContacts={this.getContacts} />
        <ModalDeleteContact
          openModal={openModal}
          contact={contact}
          getContacts={this.getContacts}
        />
        <ContactsList contacts={contacts} showModal={this.showModal} />
      </div>
    );
  }
}
