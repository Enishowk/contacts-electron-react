import React from "react";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import Avatar from "material-ui/Avatar";
import Back from "material-ui/svg-icons/hardware/keyboard-arrow-left";
import ContentAdd from "material-ui/svg-icons/content/add";
import ModalCreateContact from "../components/ModalCreateContact";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false
    };
  }

  showModal() {
    this.setState({ openModal: true });
  }

  render() {
    const { openModal } = this.state;

    return (
      <Toolbar>
        <ToolbarGroup>
          <Link to="/">
            <RaisedButton labelPosition="after" label="Back" icon={<Back />} />
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
          <ModalCreateContact openModal={openModal} />
        </ToolbarGroup>
        <ToolbarGroup>
          <Avatar
            src="https://avatars2.githubusercontent.com/u/6813755?s=460&amp;v=4"
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
