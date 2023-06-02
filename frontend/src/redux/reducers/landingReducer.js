import {createSlice} from "@reduxjs/toolkit";

const initialStates = {
    engLang:false,
    hambMenuActive:false,
    nav:false,
}

export const LandingReducer=createSlice({
    name:'MAIN_SLICE',
    initialState:initialStates,
    reducers: {
        changeStateValue:(state,action) => {
            // console.log(action);
            state[action.payload.name] = action.payload.value
            const check = action.payload.name.includes('.')
            if (!check) {
                state[action.payload.name] = action.payload.value
            }else{
                const groups=action.payload.name.split('.')
                console.log(groups);
                if(groups.length===2){
                    state[groups[0]][groups[1]]=action.payload.value;
                }else if(groups.length===3){
                    state[groups[0]][groups[1]][groups[2]]=action.payload.value;
                }else if(groups.length===4){
                    state[groups[0]][groups[1]][groups[2]][groups[3]]=action.payload.value;
                }
            }
            // state.username=action.payload
        }
    }
});

export const Data = LandingReducer.reducer;
export const {changeStateValue} = LandingReducer.actions;