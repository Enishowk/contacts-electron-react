import React from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import ContactsServices from "../services/ContactsServices";

export default class ModalDeleteContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.openModal });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSubmit() {
    const { contact, getContacts } = this.props;
    ContactsServices.deleteContact(contact).then(
      this.handleClose(),
      getContacts()
    );
  }

  render() {
    const actions = [
      <FlatButton label="Annuler" primary onClick={() => this.handleClose()} />,
      <FlatButton
        label="Supprimer"
        primary
        onClick={() => this.handleSubmit()}
      />
    ];
    const { contact } = this.props;

    return (
      <div>
        <Dialog
          title="Supprimer un contact"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={() => this.handleClose()}
        >
          <div>
            Voulez-vous vraiment supprimer
            {" "}
            {contact.firstName}
            {" "}
            {contact.lastName}
            {" "}
            ?
          </div>
        </Dialog>
      </div>
    );
  }
}

ModalDeleteContact.propTypes = {
  openModal: PropTypes.bool, // eslint-disable-line
  contact: PropTypes.shape({
    company: PropTypes.string,
    firstName: PropTypes.string,
    id: PropTypes.string,
    lastName: PropTypes.string,
    note: PropTypes.string,
    phones: PropTypes.array,
    website: PropTypes.string
  }),
  getContacts: PropTypes.func.isRequired
};

ModalDeleteContact.defaultProps = {
  openModal: false,
  contact: { firstName: "", lastName: "" }
};
