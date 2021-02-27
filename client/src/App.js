import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Accueil from './components/pages/Accueil';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import NotFound from './components/pages/NotFound';


const style={
    maxWidth :"1440px",
}
function App() {
  
  return (
    <Router style={style}>
      <Switch>
        <Route path="/" exact component={Accueil} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
