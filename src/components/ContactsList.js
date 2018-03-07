import React from "react";
import PropTypes from "prop-types";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";

const ContactsList = ({ contacts, showModal }) => (
  <Paper
    style={{
      width: "100%"
    }}
  >
    <Table
      style={{
        minWidth: 200
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Nom</TableCell>
          <TableCell>Entreprise</TableCell>
          <TableCell>Téléphone</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {contacts.map(contact => (
          <TableRow key={contact.id}>
            <TableCell>{contact.id}</TableCell>
            <TableCell>
              {contact.firstName} {contact.lastName}
            </TableCell>
            <TableCell>{contact.company}</TableCell>
            {
              <TableCell>
                {contact.phones[0] ? contact.phones[0].number : null}
              </TableCell>
            }
            <TableCell>
              <IconButton>
                <DeleteIcon onClick={() => showModal(contact)} />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default ContactsList;

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  showModal: PropTypes.func.isRequired
};
