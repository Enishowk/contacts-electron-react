import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui/svg-icons/action/delete";

const ContactsList = ({ contacts, showModal }) => (
  <Table selectable={false} multiSelectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>Nom</TableHeaderColumn>
        <TableHeaderColumn>Entreprise</TableHeaderColumn>
        <TableHeaderColumn>Téléphone</TableHeaderColumn>
        <TableHeaderColumn>Actions</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false} showRowHover={false} stripedRows>
      {contacts.map(contact => (
        <TableRow key={contact.id}>
          <TableRowColumn>{contact.id}</TableRowColumn>
          <TableRowColumn>
            {contact.firstName} {contact.lastName}
          </TableRowColumn>
          <TableRowColumn>{contact.company}</TableRowColumn>
          {
            <TableRowColumn>
              {contact.phones[0] ? contact.phones[0].number : null}
            </TableRowColumn>
          }
          <TableRowColumn>
            <IconButton>
              <DeleteIcon onClick={() => showModal(contact)} />
            </IconButton>
          </TableRowColumn>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default ContactsList;

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  showModal: PropTypes.func.isRequired
};
