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
        console.error(error);
      });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
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
        </div>
        <div
          style={{
            height: 30,
            width: "100%",
            position: "fixed",
            textAlign: "center",
            bottom: 0
          }}
        >
          <Link to="/contacts">
            <span>Mes contacts</span>
          </Link>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    listen: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func,
    replace: PropTypes.func
  }).isRequired
};
