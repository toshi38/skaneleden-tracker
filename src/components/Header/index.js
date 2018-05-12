import React from "react";
import {auth, provider} from '../../firebase';

export default class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userProfile: null,
      isSignedIn: false
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.signOut();
  }

  login() {
    auth.signInWithPopup(provider)
  }

  componentDidMount() {
    // Updating the `isSignedIn` and `userProfile` local state attributes when the Firebase Auth
    // state changes.
    this.unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user, userProfile: user });
    });
  }

  componentWillUnmount() {
    // Un-registers the auth state observer.
    this.unregisterAuthObserver();
  }

  render() {
    return <div className="jumbotron">
      <h1 className="display-4">Skåneleden progress tracker</h1>
      {this.state.isSignedIn
        ? <p>Welcome back {this.state.userProfile.displayName} below you can see your progress.  Happy hiking!</p>
        : <p className="lead">
          Here you can track your progress in completing all of the Skåneleden trails. If you wish to save your progress
          you'll need to sign in below!
        </p>
      }
      <p className="lead">
        {this.state.isSignedIn
          ? <button className="btn btn-primary btn-lg" onClick={this.logout}>Sign out</button>
          : <button className="btn btn-primary btn-lg" onClick={this.login}>Sign in</button>
        }

      </p>
    </div>
  }
}
