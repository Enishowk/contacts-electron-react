import React from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import ContactServices from "../services/ContactsServices";

export default class ModalCreateContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      lastName: "",
      firstName: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.openModal });
  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSubmit() {
    const { lastName, firstName } = this.state;
    ContactServices.postContact({ lastName, firstName })
      .then(this.handleClose())
      .catch(err => console.log(err));
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary onClick={() => this.handleClose()} />,
      <FlatButton label="Submit" primary onClick={() => this.handleSubmit()} />
    ];

    const { lastName, firstName } = this.state;

    return (
      <div>
        <Dialog
          title="Ajouter un contact"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={() => this.handleClose()}
        >
          <TextField
            placeholder="Nom"
            name="lastName"
            type="text"
            value={lastName}
            onChange={this.handleInputChange}
          />
          <br />
          <br />
          <TextField
            placeholder="Prenom"
            name="firstName"
            type="text"
            value={firstName}
            onChange={this.handleInputChange}
          />
        </Dialog>
      </div>
    );
  }
}

ModalCreateContact.propTypes = {
  openModal: PropTypes.bool
};

ModalCreateContact.defaultProps = {
  openModal: false
};
