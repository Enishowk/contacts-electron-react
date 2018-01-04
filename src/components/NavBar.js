import React from "react";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import Avatar from "material-ui/Avatar";
import Back from "material-ui/svg-icons/hardware/keyboard-arrow-left";
import ContentAdd from "material-ui/svg-icons/content/add";

export default class NavBar extends React.Component {
  render() {
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
          />
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
