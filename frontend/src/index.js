import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore} from 'redux';
import './assets/css/index.scss';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {rootReducer} from "./redux/reducers/reducers";
import VisibleApp from "./redux/containers/VisibleApp";

const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <VisibleApp/>
      </Provider>
  </React.StrictMode>
);

reportWebVitals();
