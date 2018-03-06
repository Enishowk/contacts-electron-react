import React from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import ContactServices from "../services/ContactsServices";

export default class ModalCreateContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      entreprise: "",
      firstName: "",
      lastName: "",
      phone1Number: "",
      phone1Type: ""
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
    const { closeModal } = this.props;
    this.setState({ open: false });
    closeModal();
  }

  handleSubmit() {
    const {
      company,
      lastName,
      firstName,
      phone1Type,
      phone1Number
    } = this.state;
    const { getContacts } = this.props;
    const phones = [{ type: phone1Type, number: phone1Number }];
    ContactServices.postContact({
      lastName,
      firstName,
      phones,
      company
    }).then(this.handleClose(), getContacts());
  }

  render() {
    const actions = [
      <RaisedButton
        label="Annuler"
        secondary
        onClick={() => this.handleClose()}
        style={{ margin: 5 }}
      />,
      <RaisedButton
        tton
        label="Ajouter"
        primary
        onClick={() => this.handleSubmit()}
        style={{ margin: 5 }}
      />
    ];

    const {
      company,
      lastName,
      firstName,
      phone1Type,
      phone1Number
    } = this.state;

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          onRequestClose={() => this.handleClose()}
          open={this.state.open}
          title="Ajouter un contact"
        >
          <TextField
            floatingLabelText="Nom"
            name="lastName"
            onChange={this.handleInputChange}
            type="text"
            value={lastName}
          />
          <br />
          <br />
          <TextField
            floatingLabelText="Prenom"
            name="firstName"
            onChange={this.handleInputChange}
            type="text"
            value={firstName}
          />
          <br />
          <br />
          <TextField
            floatingLabelText="Entreprise"
            name="company"
            onChange={this.handleInputChange}
            type="text"
            value={company}
          />
          <br />
          <br />
          <TextField
            floatingLabelText="Type"
            name="phone1Type"
            onChange={this.handleInputChange}
            type="text"
            value={phone1Type}
            style={{ width: "90px" }}
          />
          <TextField
            floatingLabelText="Téléphone"
            name="phone1Number"
            onChange={this.handleInputChange}
            type="text"
            value={phone1Number}
            style={{ paddingLeft: "10px", width: "150px" }}
          />
        </Dialog>
      </div>
    );
  }
}

ModalCreateContact.propTypes = {
  closeModal: PropTypes.func.isRequired,
  getContacts: PropTypes.func.isRequired,
  openModal: PropTypes.bool // eslint-disable-line
};

ModalCreateContact.defaultProps = {
  openModal: false
};
