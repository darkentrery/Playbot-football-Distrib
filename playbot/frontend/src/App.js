import logo from './assets/icon/logo.svg';
import './assets/css/App.css';
import RegistrationComponent from "./components/RegistrationComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <RegistrationComponent/>



        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<p>*/}
        {/*  Edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
        {/*<a*/}
        {/*  className="App-link"*/}
        {/*  href="https://reactjs.org"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  Learn React*/}
        {/*</a>*/}
      </header>
    </div>

  );
}

export default App;
