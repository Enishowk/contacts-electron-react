import React from "react";
import AddIcon from "material-ui-icons/Add";
import Button from "material-ui/Button";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import ContactsList from "../components/ContactsList";
import ContactsService from "../services/ContactsServices";
import ModalCreateContact from "../components/ModalCreateContact";
import ModalDeleteContact from "../components/ModalDeleteContact";
import NavBar from "../components/NavBar";

const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class ContactsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDeleteModal: false,
      openCreateModal: false,
      contacts: []
    };
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.showCreateModal = this.showCreateModal.bind(this);
    this.getContacts = this.getContacts.bind(this);
    this.getContacts();
  }

  getContacts() {
    ContactsService.getContacts()
      .then(response => {
        this.setState({
          contacts: response.data,
          openDeleteModal: false,
          openCreateModal: false
        });
      })
      .catch(error => {
        if (error.response.data.code === 401) {
          const location = {
            pathname: `/`,
            state: {}
          };
          this.props.history.push(location);
        }
      });
  }

  showDeleteModal(contact) {
    this.setState({ openDeleteModal: true, contact });
  }

  showCreateModal() {
    this.setState({ openCreateModal: true });
  }

  render() {
    const { contacts, openDeleteModal, openCreateModal, contact } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <NavBar getContacts={this.getContacts} />
        <ModalDeleteContact
          openModal={openDeleteModal}
          contact={contact}
          getContacts={this.getContacts}
        />
        <ModalCreateContact
          openModal={openCreateModal}
          getContacts={this.getContacts}
        />
        <ContactsList contacts={contacts} showModal={this.showDeleteModal} />
        <Button
          variant="fab"
          className={classes.fab}
          color="primary"
          onClick={this.showCreateModal}
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}

ContactsPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    listen: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func,
    replace: PropTypes.func
  }).isRequired
};

export default withStyles(styles, { withTheme: true })(ContactsPage);
