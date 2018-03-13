import React from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
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
              label="Username"
              name="username"
              onChange={this.handleInputChange}
              type="text"
              value={username}
            />
            <br />
            <TextField
              label="Password"
              name="password"
              onChange={this.handleInputChange}
              type="password"
              value={password}
            />
            <br />
            <br />
            <Button type="submit" variant="raised" color="primary">
              Connexion
            </Button>
          </form>
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
