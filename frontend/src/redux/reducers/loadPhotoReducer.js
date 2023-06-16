import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    step: 1,
    photo: null,
    isLoading: false,
    error: 'Такой формат не поддерживается.',
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

export const loadPhoto = loadPhotoSlice.reducer;
export const { setStep, setIsLoading, setPhoto, setError, setStateToDefault } =
    loadPhotoSlice.actions;

export const uploadPhoto = (photoData) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        // запрос
        // Обработка успешного ответа
    } catch (error) {
        dispatch(setError(error.message));
    }
    dispatch(setIsLoading(false));
};
