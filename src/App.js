import { Route, Switch } from "react-router-dom";
import Products from "./components/Products"; 
import Cart from "./components/Cart";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Products/>
        </Route>
        <Route path="/cart">
          <Cart/>
        </Route>
        {/* <Route path="/login">
          <Login/>
        </Route> */}
      </Switch>
          
    </div>
  );
}

export default App;
