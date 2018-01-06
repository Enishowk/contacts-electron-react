import React from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Link } from "react-router-dom";
import ContactsServices from "../services/ContactsServices";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    ContactsServices.login(this.state.username, this.state.password)
      .then(response => {
        const token = response.data.token;
        localStorage.setItem("token", token);

        const location = {
          pathname: `/contacts`,
          state: {}
        };

        this.props.history.push(location);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <TextField
            placeholder="Username"
            name="username"
            type="text"
            value={username}
            onChange={this.handleInputChange}
          />
          <br />
          <br />
          <TextField
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleInputChange}
          />
          <br />
          <br />
          <RaisedButton type="submit" label="Connexion" primary />
        </form>
        <div className="nav-item">
          <Link to="/contacts">
            <span>Mes contacts</span>
          </Link>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired
};
