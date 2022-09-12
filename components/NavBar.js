import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

export default class Navbar extends Component {

  //revokes admin privileges from aws cognito
  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
    } catch (error) {
      console.log(error.message);
    }

  }

  //uses user authentication to determine what buttons to show to users (see lines 43-75)
  render() {
    return (
      <nav className="navbar is-black" role="navigation" aria-label="main navigation">

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
              <span>Classes</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>

          <div class="dropdown-menu" id="dropdown-menu4" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <p>601AZ</p>
              </div>
              <div class="dropdown-item">
                <p>602AZ</p>
              </div>
              <div class="dropdown-item">
                <p>603AZ</p>
              </div>
            </div>
          </div>
            <a href="/Tasks" className="navbar-item">
              Products
            </a>
            <a href="/Classes" className="navbar-item">
              FAQs
            </a>
            {this.props.auth.isAuthenticated && this.props.auth.user && (
            <a href="/TaskAdmin" className="navbar-item">
              Task Admin
            </a>
            )}
          </div>

          { <div className="navbar-end">
            <div className="navbar-item">
              
              {this.props.auth.isAuthenticated && this.props.auth.user && (

                <p>Hello {this.props.auth.user.username} </p>

              )}
    
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/register" className="button is-black">
                      <strong>Register</strong>
                    </a>
                    <a href="/login" className="button is-danger">
                      Log in
                    </a>
                  </div>
               )}
               {this.props.auth.isAuthenticated && (
                  <a href="/changepassword" className="button is-primary"> Change Password </a>
                )}
                {this.props.auth.isAuthenticated && (
                  <a href="/" onClick={this.handleLogOut} className="button is-dark">
                    Log out
                  </a>
                )}
              </div>
            </div>
          </div> }
        </div>
        </div>
      </nav>
    )
  }
}
