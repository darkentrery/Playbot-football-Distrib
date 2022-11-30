import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore} from 'redux';
// import './assets/css/index.css';
import './assets/css/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {rootReducer} from "./redux/reducers/reducers";
import VisibleApp from "./redux/containers/VisibleApp";

const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          {/*<App/>*/}
          <VisibleApp/>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
