import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import Home from './Home';
// import Product from './components/Product';
// import Service from './components/Service';
import Navbar from './components/Navbar';
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
function App() {
  return (
    <div className="main-container">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home}/>
          {/* <Route path="/product" component={Product}/>
          <Route path="/service" component={Service}/> */}
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
