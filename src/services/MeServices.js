import axios from "axios";

const CONTACTS_BASE_PATH = "http://localhost:8000";
class MeServices {
  static getInformations() {
    const CONFIG = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    return axios.get(`${CONTACTS_BASE_PATH}/me`, CONFIG);
  }
}

export default MeServices;
