import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import "normalize.css";
import './assets/css/index.scss';
import {Provider} from "react-redux";
import {rootReducer} from "./redux/reducers/reducers";
import VisibleApp from "./redux/containers/VisibleApp";
import {noticeService} from "./services/NoticeService";
import './i18n';

const store = createStore(rootReducer, applyMiddleware(thunk));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Suspense fallback={<div>loading...</div>}>
                <VisibleApp/>
            </Suspense>
        </Provider>
    </React.StrictMode>
);

noticeService.registerSw();

