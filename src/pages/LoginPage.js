import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Axios from "axios";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      pass: ""
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

    Axios.post("http://localhost:8000/login", {
      username: this.state.login,
      password: this.state.pass
    })
      .then(response => {
        const token = response.data.token;
        localStorage.setItem("token", token);

        const location = {
          pathname: `/contacts`,
          state: {}
        };
        setTimeout(
          () => {
            this.props.history.push(location);
          },
          1500
        );
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { login, pass } = this.state;
    return (
      <div>
        Login
        <form onSubmit={this.handleSubmit}>
          <label>
            Login:
            <input
              name="login"
              type="text"
              value={login}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Pass:
            <input
              name="pass"
              type="password"
              value={pass}
              onChange={this.handleInputChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="nav-item">
          <Link to="/contacts" className="button">
            <span className="icon">
              <i className="fa fa-address-book " />
            </span>
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
