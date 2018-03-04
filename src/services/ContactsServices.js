import axios from "axios";

const CONTACTS_BASE_PATH = "http://localhost:8000";
class ContactsServices {
  static login(username, password) {
    return axios.post(`${CONTACTS_BASE_PATH}/login`, {
      username,
      password
    });
  }

  static getContacts() {
    const CONFIG = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    return axios.get(`${CONTACTS_BASE_PATH}/contacts`, CONFIG);
  }

  static postContact(contact) {
    const CONFIG = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    return axios.post(`${CONTACTS_BASE_PATH}/contacts`, contact, CONFIG);
  }

  static deleteContact(contact) {
    const CONFIG = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    return axios.delete(`${CONTACTS_BASE_PATH}/contacts/${contact.id}`, CONFIG);
  }
}

export default ContactsServices;
