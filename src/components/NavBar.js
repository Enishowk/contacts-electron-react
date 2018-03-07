import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import ArrowBack from "material-ui-icons/KeyboardArrowLeft";
import Avatar from "material-ui/Avatar";
import Menu, { MenuItem } from "material-ui/Menu";
import MeServices from "../services/MeServices";
import ModalCreateContact from "../components/ModalCreateContact";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      anchorEl: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    MeServices.getInformations().then(response => {
      this.setState({ avatar: response.data.avatar });
    });
  }

  handleChange(event, checked) {
    this.setState({ auth: checked });
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  showModal() {
    this.setState({ openModal: true });
  }
  closeModal() {
    this.setState({ openModal: false });
  }

  render() {
    const { anchorEl, avatar, openModal } = this.state;
    const open = Boolean(anchorEl);

    const styles = {
      root: {
        flexGrow: 1
      },
      flex: {
        flex: 1
      },
      menuButton: {
        marginLeft: -12,
        marginRight: 20,
        color: "#FFFFFF"
      }
    };

    return (
      <div style={styles.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Link to="/">
              <IconButton style={styles.menuButton} aria-label="Menu">
                <ArrowBack />
              </IconButton>
            </Link>
            <Typography variant="title" color="inherit" style={styles.flex}>
              Vos contacts
            </Typography>
            <Button
              variant="raised"
              color="secondary"
              onClick={() => this.showModal()}
            >
              Ajouter un contact
            </Button>
            <ModalCreateContact
              openModal={openModal}
              closeModal={this.closeModal}
              getContacts={this.props.getContacts}
            />
            <IconButton
              aria-owns={open ? "menu-appbar" : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <Avatar
                src={
                  avatar &&
                    `http://127.0.0.1:8000/public/uploads/avatars/${avatar}`
                }
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>Mon compte</MenuItem>
              <MenuItem onClick={this.handleClose}>Déconnexion</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  getContacts: PropTypes.func.isRequired
};
