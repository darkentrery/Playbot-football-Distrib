import {Data} from "./reducers/landingReducer"
import {configureStore,combineReducers} from "@reduxjs/toolkit";

const rootReducer=combineReducers({
    Data
})

export const setupStore=()=>{
    return configureStore({
        reducer:rootReducer
    })
}