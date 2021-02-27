import { BrowserRouter, Route, Switch } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

function App()
{
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Accueil} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
