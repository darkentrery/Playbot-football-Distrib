import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore} from 'redux';
import "normalize.css";
import './assets/css/index.scss';
import {Provider} from "react-redux";
import {rootReducer} from "./redux/reducers/reducers";
import VisibleApp from "./redux/containers/VisibleApp";
import {noticeService} from "./services/NoticeService";

const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <VisibleApp/>
        </Provider>
    </React.StrictMode>
);

noticeService.registerSw();

