import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Headers from "./components/Headers";
import Toast from "./components/Toast";
import ItemDetail from "./pages/ItemDetail";
import ResourceDetail from "./pages/ResourceDetail";
import Resources from "./pages/Resources";

function App() {
  const [isAdd, setIsAdd] = useState(false);

  return (
    <Router>
      <Headers />

      <div style={{ padding: "0px 80px" }}>
        <Switch>
          <Route path="/resource/:resourceId">
            {isAdd ? (
              <ItemDetail setIsAdd={setIsAdd} />
            ) : (
              <ResourceDetail setIsAdd={setIsAdd} />
            )}
          </Route>

          <Route exact path="/">
            <Resources />
          </Route>
        </Switch>

        <Toast />
      </div>
    </Router>
  );
}

export default App;
