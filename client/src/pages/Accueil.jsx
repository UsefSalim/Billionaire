import React, { Component } from 'react';
import Form from '../components/Form';
export default class Accueil extends Component {
  state = {
    isOpen: false,
    form: null,
  };
 
  loginHandelClick = () => {
    this.setState({
      isOpen: true,
      form: 'Login',
    });
  };
  registerHandelClick = () => {
    this.setState({
      isOpen: true,
      form: 'Register',
    });
  };
  switchHandelClick = () => {
    const newValue = this.state.form === 'Register' ? 'Login' : 'Register';
    this.setState({
      form: newValue,
    });
  };
  closeHandelClick = () => {
    this.setState({
      isOpen: false,
      form: null,
    });
  };

  render() {
    const ifOpen =
      this.state.isOpen === true ? (
        this.state.form === 'Register' ? (
          <Form
            title="Register"
            close={this.closeHandelClick}
            click={this.switchHandelClick}
          />
        ) : (
          <Form
            title="Login"
            close={this.closeHandelClick}
            click={this.switchHandelClick}
          />
        )
      ) : null;
    return (
      <>
        {this.state.isOpen === false && (
          <div>
            <button onClick={this.loginHandelClick}>Login</button>
            <button onClick={this.registerHandelClick}>Register</button>
          </div>
        )}
        {ifOpen}
      </>
    );
  }
}
