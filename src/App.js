import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import SideNav from "./Components/SideNav";

import MapView from "./Container/MapView";
function App() {
  return (
    <>
      <Router>
        <SideNav />
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`}>
            <MapView />
          </Route>
          <Route exact path={`${process.env.PUBLIC_URL}/home`}>
            <MapView />
          </Route>
          <Route path="*">404</Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
