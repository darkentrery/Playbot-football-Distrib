import logo from './assets/icon/logo.svg';
import './assets/css/App.css';
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";
import {Route, BrowserRouter as Router, Routes, Link} from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Router>
              <main>
                  <ul>
                    <li>
                        <Link to={AuthRoutes.login}><h3>Login</h3></Link>
                    </li>
                    <li>
                        <Link to={AuthRoutes.signUp} ><h3>Sign Up</h3></Link>
                    </li>
                  </ul>



                  <div className="features">
                      <Routes>
                          <Route exact path={AuthRoutes.login} element={<LoginComponent/>}/>
                          <Route exact path={AuthRoutes.signUp} element={<SignUpComponent/>}/>
                      </Routes>
                  </div>
              </main>
          </Router>




      </header>
    </div>

  );
}

export default App;
