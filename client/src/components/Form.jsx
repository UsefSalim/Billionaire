import React from 'react';
export default function Form(props) {
  const subTitle =
    props.title === 'Login'
      ? 'commencer le jeux '
      : 'Rejoiner nos joueurs et commancer le jeux';

  const redirectLink =
    props.title === 'Login' ? (
      <span onClick={props.click} className="signup-link">
        vous avez pas de compte crée un
        <p> &ensp; ICI</p>
      </span>
    ) : (
      <span onClick={props.click} className="signup-link">
        vous avez deja un compte connecter vous
        <p> &ensp; ICI</p>
      </span>
    );

  const RegisterPartForm = props.title === 'Register' && (
    <div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" className="form-control" />
      </div>
      <div className="form-group">
        <label>FullName</label>
        <input type="text" className="form-control" />
      </div>
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
            <h3 className="form-title">{props.title}</h3>
            <form className="form-horizontal">
              <div className="form-group">
                <label>Numer Telephone</label>
                <input type="text" className="form-control" />
              </div>
              {RegisterPartForm}
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" />
              </div>
              <button className="btn signin">{props.title}</button>
            </form>
            {redirectLink}
          </div>
        </div>
        <div onClick={props.close} className="fermeture">
          X
        </div>
      </div>
    </div>
  );
}
