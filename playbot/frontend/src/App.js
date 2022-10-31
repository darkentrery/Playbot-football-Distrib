import logo from './assets/icon/logo.svg';
import './assets/css/App.css';
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";
import {Route, BrowserRouter as Router, Routes, Link} from "react-router-dom";
import { TLoginButton, TLoginButtonSize } from 'react-telegram-auth';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Router>
              <main>
                  <ul>
                    <li>
                        <Link to={`/login`}><h3>Login</h3></Link>
                    </li>
                    <li>
                        <Link to={"/sign-up"} ><h3>Sign Up</h3></Link>
                    </li>
                  </ul>
                    <TLoginButton
                        botName="PlaybotTestBot"
                        buttonSize={TLoginButtonSize.Large}
                        lang="en"
                        usePic={false}
                        cornerRadius={20}
                        // onAuthCallback={(user) => {
                        //   console.log('Hello, user!', user);
                        // }}
                        requestAccess={'write'}
                        redirectUrl={"http://ba62-2a0d-b201-8010-d531-c4fe-c240-f438-dbb0.ngrok.io/auth/complete/telegram"}
                      />


                  <div className="features">
                      <Routes>
                          <Route exact path={`/login`} element={<LoginComponent/>}/>
                          <Route exact path={`/sign-up`} element={<SignUpComponent/>}/>
                      </Routes>
                  </div>
              </main>
          </Router>




      </header>
    </div>

  );
}

export default App;
