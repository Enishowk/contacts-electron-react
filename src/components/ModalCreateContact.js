import React from "react";
import PropTypes from "prop-types";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import ContactServices from "../services/ContactsServices";

const initState = {
  open: false,
  company: "",
  firstName: "",
  lastName: "",
  phone1Number: "",
  phone1Type: ""
};

export default class ModalCreateContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState;

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
    }).then(this.setState(initState), getContacts());
  }

  render() {
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
          onClose={() => this.handleClose()}
          open={this.state.open}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" style={{ width: "500px" }}>
            Ajouter un contact
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Nom"
              name="lastName"
              onChange={this.handleInputChange}
              type="text"
              value={lastName}
              margin="dense"
              fullWidth
            />
            <TextField
              label="Prenom"
              name="firstName"
              onChange={this.handleInputChange}
              type="text"
              value={firstName}
              fullWidth
            />
            <TextField
              label="Entreprise"
              name="company"
              onChange={this.handleInputChange}
              type="text"
              value={company}
              fullWidth
            />
            <TextField
              label="Type"
              name="phone1Type"
              onChange={this.handleInputChange}
              type="text"
              value={phone1Type}
              style={{ width: "90px" }}
            />
            <TextField
              label="Téléphone"
              name="phone1Number"
              onChange={this.handleInputChange}
              type="text"
              value={phone1Number}
              style={{ width: "462px" }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="raised"
              color="secondary"
              onClick={() => this.handleClose()}
              style={{ margin: 5 }}
            >
              Annuler
            </Button>
            ,
            <Button
              variant="raised"
              color="primary"
              onClick={() => this.handleSubmit()}
              style={{ margin: 5 }}
            >
              Ajouter
            </Button>
          </DialogActions>
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
