import React from "react";
import PropTypes from "prop-types";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Button from "material-ui/Button";
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
    const { closeModal } = this.props;
    this.setState({ open: false });
    closeModal();
  }

  handleSubmit() {
    const { contact, getContacts } = this.props;
    ContactsServices.deleteContact(contact).then(
      this.handleClose(),
      getContacts()
    );
  }

  render() {
    const { contact } = this.props;

    return (
      <div>
        <Dialog
          title="Supprimer un contact"
          open={this.state.open}
          onClose={() => this.handleClose()}
        >
          <DialogTitle>Supprimer un contact</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Voulez-vous vraiment supprimer
              {" "}
              {contact.firstName}
              {" "}
              {contact.lastName}
              {" "}
              ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              variant="raised"
              onClick={() => this.handleClose()}
            >
              Annuler
            </Button>
            <Button
              color="primary"
              variant="raised"
              autoFocus
              onClick={() => this.handleSubmit()}
            >
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ModalDeleteContact.propTypes = {
  closeModal: PropTypes.func.isRequired,
  contact: PropTypes.shape({
    company: PropTypes.string,
    firstName: PropTypes.string,
    id: PropTypes.string,
    lastName: PropTypes.string,
    note: PropTypes.string,
    phones: PropTypes.array,
    website: PropTypes.string
  }),
  getContacts: PropTypes.func.isRequired,
  openModal: PropTypes.bool // eslint-disable-line
};

ModalDeleteContact.defaultProps = {
  openModal: false,
  contact: { firstName: "", lastName: "" }
};
