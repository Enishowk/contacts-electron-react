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

const ContactsList = ({ contacts }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>Nom</TableHeaderColumn>
        <TableHeaderColumn>Entreprise</TableHeaderColumn>
        <TableHeaderColumn>Téléphone</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
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
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default ContactsList;

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired
};
