import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import Avatar from "material-ui/Avatar";
import Back from "material-ui/svg-icons/hardware/keyboard-arrow-left";
import ContentAdd from "material-ui/svg-icons/content/add";
import MeServices from "../services/MeServices";
import ModalCreateContact from "../components/ModalCreateContact";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false
    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    MeServices.getInformations().then(response => {
      this.setState({ avatar: response.data.avatar });
    });
  }

  showModal() {
    this.setState({ openModal: true });
  }
  closeModal() {
    this.setState({ openModal: false });
  }

  render() {
    const { openModal, avatar } = this.state;

    return (
      <Toolbar>
        <ToolbarGroup>
          <Link to="/">
            <RaisedButton
              labelPosition="after"
              label="Revenir"
              icon={<Back />}
            />
          </Link>
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton
            labelPosition="after"
            label="Ajouter un contact"
            primary
            icon={<ContentAdd />}
            onClick={() => this.showModal()}
          />
          <ModalCreateContact
            openModal={openModal}
            closeModal={this.closeModal}
            getContacts={this.props.getContacts}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <Avatar
            src={
              avatar && `http://127.0.0.1:8000/public/uploads/avatars/${avatar}`
            }
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

NavBar.propTypes = {
  getContacts: PropTypes.func.isRequired
};
