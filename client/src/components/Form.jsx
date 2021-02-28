import React, { Component } from 'react';
import Inputs from './Inputs'
import axios from 'axios';
// import Error from './Error'
class Form extends Component
{
  state = {
    name: '',
    number: '',
    email: '',
    password: '',
    errors: '',
    // displayed: false
  }

  loginHandelClick = async (e) =>
  {
    try
    {
      const isLoged = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        number: this.state.number,
        password: this.state.password
      })
      if (isLoged)
      {
        this.setState({ errors: '' })
        if (isLoged.data.role === "User")
          window.location = "/profile"
        else
          window.location = "/admin"

      }
    } catch (error)
    {
      if (error.response)
      {
        this.setState({
          errors: error.response.data.message
        })
      }
    }

  }
  RegisterHandelClick = () => { }

  inputHandelChanger = (type, content) =>
  {
    switch (type)
    {
      case 'name':
        this.setState({
          name: content.target.value
        })
        break;
      case 'email':
        this.setState({
          email: content.target.value
        })
        break;
      case 'number':
        this.setState({
          number: content.target.value
        })
        break;
      case 'password':
        this.setState({
          password: content.target.value
        })
        break;
      default:
        break;
    }

  }
  render()
  {
    const errorMessage = (this.state.errors !== '')
      ? <div className="alert">
        <span className="closebtn" >
          <strong>{this.state.errors}</strong>
        </span>
      </div>
      : null
    const subTitle = (this.props.title === 'Login')
      ? "connecter vous et commancer le jeux"
      : "crée votre compte et rejoigner nos joueur \" lancer le defie\" "
    const validationButton = (this.props.title === 'Login')
      ? (<button onClick={this.loginHandelClick} className="btn signin">Login</button>)
      : <button onClick={this.RegisterHandelClick} className="btn signin">Register</button>

    const redirectLink =
      this.props.title === 'Login' ? (
        <span onClick={this.props.click} className="signup-link">
          vous avez pas de compte crée un
          <p> &ensp; ICI</p>
        </span>
      ) : (
          <span onClick={this.props.click} className="signup-link">
            vous avez deja un compte connecter vous
            <p> &ensp; ICI</p>
          </span>
        );

    const RegisterPartForm = this.props.title === 'Register' && (
      <div>
        <Inputs title="Email" type="email" name="email" change={this.inputHandelChanger.bind(this, "email")} />
        <Inputs title="FullName" type="text" name="name" change={this.inputHandelChanger.bind(this, "name")} />
      </div>
    );
    return (
      <div>
        <div className="form-bg">
          <div className="form-container">
            <div className="left-content">
              <h3 className="title">Billionair</h3>
              <h4 className="sub-title">{subTitle}</h4>
            </div>
            <div className="right-content">
              {errorMessage}
              <h3 className="form-title">{this.props.title}</h3>
              <div className="form-horizontal">
                <Inputs title="Numer Telephone"
                  type="text"
                  name="number" change={this.inputHandelChanger.bind(this, "number")} />
                {RegisterPartForm}
                <Inputs title="Password" type="password" name="password" change={this.inputHandelChanger.bind(this, "password")} />
                {validationButton}
              </div>
              {redirectLink}
            </div>
          </div>
          <div onClick={this.props.close} className="fermeture">
            X
        </div>
        </div>
      </div>
    );
  }
}
export default Form;
