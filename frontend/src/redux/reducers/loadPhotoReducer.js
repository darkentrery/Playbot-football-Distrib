import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    step: 1,
    photo: null,
    isLoading: false,
}

export const loadPhotoSlice = createSlice({
    name: "loadPhotoSlice",
    initialState,
    reducers: {
        setStep (state, action) {
            return {
                ...state,
                step: action.payload
            }
        },
        setIsLoading (state, action) {
            return {
                ...state,
                isLoading: action.payload,
            }
        },
        setPhoto (state, action) {
            return {
                ...state,
                photo: action.payload
            }
        }
    }
})


export const loadPhoto = loadPhotoSlice.reducer
export const { setStep, setIsLoading, setPhoto } = loadPhotoSlice.actions

