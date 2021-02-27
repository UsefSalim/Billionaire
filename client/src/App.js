import { BrowserRouter, Route, Switch } from "react-router-dom";
import Accueil from "./pages/Accueil";
import NotFound from "./pages/NotFound";

function App()
{
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Accueil} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
