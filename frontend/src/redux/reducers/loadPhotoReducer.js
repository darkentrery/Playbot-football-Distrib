import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    step: 2,
}

export const loadPhotoSlice = createSlice({
    name: "loadPhotoSlice",
    initialState,
    reducers: {
        testAction (state, action) {
            console.log('test is working');
        }
    }
})


export const loadPhoto = loadPhotoSlice.reducer
export const { testAction } = loadPhotoSlice.actions

