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
      contactsList: [],
      openCreateModal: false,
      openDeleteModal: false
    };
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.getContacts = this.getContacts.bind(this);
    this.showCreateModal = this.showCreateModal.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.getContacts();
  }

  getContacts() {
    ContactsService.getContacts()
      .then(response => {
        this.setState({
          contactsList: response.data,
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
  closeDeleteModal() {
    this.setState({ openDeleteModal: false });
  }

  showCreateModal() {
    this.setState({ openCreateModal: true });
  }
  closeCreateModal() {
    this.setState({ openCreateModal: false });
  }

  render() {
    const {
      contact,
      contactsList,
      openCreateModal,
      openDeleteModal
    } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <NavBar getContacts={this.getContacts} />
        <ModalDeleteContact
          openModal={openDeleteModal}
          closeModal={this.closeDeleteModal}
          contact={contact}
          getContacts={this.getContacts}
        />
        <ModalCreateContact
          openModal={openCreateModal}
          closeModal={this.closeCreateModal}
          getContacts={this.getContacts}
        />
        <ContactsList
          contacts={contactsList}
          showModal={this.showDeleteModal}
        />
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
