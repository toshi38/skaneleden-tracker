import React from "react";
import {auth, provider} from '../../firebase';

export default class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {

  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  render() {
    return <div className="jumbotron">
      <h1 className="display-4">Skåneleden progress tracker</h1>
      {this.state.user
        ? <p>Welcome back {this.state.user.displayName} below you can see your progress.  Happy hiking!</p>
        : <p className="lead">
          Here you can track your progress in completing all of the Skåneleden trails. If you wish to save your progress
          you'll need to sign in below!
        </p>
      }
      <p className="lead">
        {this.state.user
          ? <button className="btn btn-primary btn-lg" onClick={this.logout}>Sign out</button>
          : <button className="btn btn-primary btn-lg" onClick={this.login}>Sign in</button>
        }

      </p>
    </div>
  }
}
