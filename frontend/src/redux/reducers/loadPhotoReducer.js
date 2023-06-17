import { createSlice } from '@reduxjs/toolkit';
import { setUserPhotoModeration } from '../actions/actions';

const initialState = {
    step: 1,
    photo: null,
    isLoading: false,
    error: '',
};

export const loadPhotoSlice = createSlice({
    name: 'loadPhotoSlice',
    initialState,
    reducers: {
        setStep(state, action) {
            return {
                ...state,
                step: action.payload,
            };
        },
        setIsLoading(state, action) {
            return {
                ...state,
                isLoading: action.payload,
            };
        },
        setPhoto(state, action) {
            return {
                ...state,
                photo: action.payload,
            };
        },
        setError(state, action) {
            return {
                ...state,
                error: action.payload,
            };
        },
        setStateToDefault() {
            return {
                ...initialState,
            };
        },
    },
});


export const { setStep, setIsLoading, setPhoto, setError, setStateToDefault } = loadPhotoSlice.actions;

export const loadPhotoAction = (photoData) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        // запрос
        if(!/png|jpg|heic/.test(photoData.name.split('.').pop())) throw new Error("Такой формат не поддерживается.")
        
        dispatch(setPhoto(photoData));
        setTimeout(() => {
            dispatch(setStep(2))
            dispatch(setIsLoading(false));
        }, 500)
        
    } catch (error) {
        dispatch(setError(error.message));
        dispatch(setIsLoading(false));
    }
    
};

export const confirmPhotoAction = () => async (dispatch, getState) => {
    try {
        
        // запрос на подтверждение фотки start


        // запрос на подтверждение фотки end
        const state = getState();
        const { photo } = state.loadPhoto;
        console.log(photo, "loaded photo")
        dispatch(setStep(3))
        dispatch(setUserPhotoModeration({finished: false, photo: photo, message: "Такой формат не поддерживается. Поддерживаемые форматы: PNG, JPG, HEIC"}));
        // dispatch(setUserPhotoModeration({finished: false, photo: photo}));
    } catch (error) {
        console.log(error)
    }
}

export const cancelUserPhotoModeration = () => async (dispatch) => {
    try {
        // запрос на отмену фотки

        // запрос на отмену фотки end

        dispatch(setUserPhotoModeration({}))
    } catch (error) {
        console.log(error)
    }
}
export const loadPhoto = loadPhotoSlice.reducer;
