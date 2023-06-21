import { combineReducers } from 'redux';
import {Data} from "./landingReducer";
import {windows} from "./windowsReducer";
import {user} from "./userReducer";
import {event} from "./eventReducer";
import {location} from "./locationReducer";
import {app} from "./appReducer";
import {loadPhoto} from './loadPhotoReducer';


export let rootReducer = combineReducers({
    windows,
    user,
    event,
    location,
    app,
    Data, 
    loadPhoto
});






