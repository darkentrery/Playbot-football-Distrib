import logo from './assets/icon/logo.svg';
import './assets/css/App.css';
import './assets/css/main.scss';
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";
import {Route, BrowserRouter as Router, Routes, Link} from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import React, {useState} from "react";
import {OpenSignUpContext, OpenLoginContext, OpenRefreshPasswordContext} from "./context/AuthContext";
import RefreshPasswordComponent from "./components/RefreshPasswordComponent";



function App(defaultValue) {
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openRefreshPassword, setOpenRefreshPassword] = useState(false);

    const signUpWindow = { openSignUp, setOpenSignUp };
    const loginWindow = { openLogin, setOpenLogin };
    const refreshPasswordWindow = { openRefreshPassword, setOpenRefreshPassword };


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

                  <button onClick={() => setOpenSignUp(!openSignUp)} type="button" className="">Register</button>
                  <button onClick={() => setOpenLogin(!openLogin)} type="button" className="">Login</button>
                  <OpenLoginContext.Provider value={loginWindow}>
                      <OpenSignUpContext.Provider value={signUpWindow}>
                          <SignUpComponent/>
                      </OpenSignUpContext.Provider>
                  </OpenLoginContext.Provider>
                  <OpenLoginContext.Provider value={loginWindow}>
                      <OpenSignUpContext.Provider value={signUpWindow}>
                          <OpenRefreshPasswordContext.Provider value={refreshPasswordWindow}>
                              <LoginComponent/>
                          </OpenRefreshPasswordContext.Provider>
                      </OpenSignUpContext.Provider>
                  </OpenLoginContext.Provider>
                  <OpenLoginContext.Provider value={loginWindow}>
                      <OpenRefreshPasswordContext.Provider value={refreshPasswordWindow}>
                          <RefreshPasswordComponent/>
                      </OpenRefreshPasswordContext.Provider>
                  </OpenLoginContext.Provider>


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
