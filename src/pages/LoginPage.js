import React from "react";
import { Link } from "react-router-dom";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false
    };
  }

  // login() {
  //   const location = {
  //     pathname: `/contacts`,
  //     state: {}
  //   };
  //   setTimeout(
  //     () => {
  //       this.props.history.push(location);
  //     },
  //     1500
  //   );
  // }
  render() {
    return (
      <div>
        Login
        <div className="nav-item">
          {/* <button
            onClick={() => {
              this.login();
            }}
          >
            Login
          </button> */}
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
