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
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    return axios.get(`${CONTACTS_BASE_PATH}/contacts`, config);
  }
}

export default ContactsServices;
