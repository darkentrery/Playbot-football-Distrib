import { createSlice } from '@reduxjs/toolkit';
import {
    setUserPhotoModeration,
    showLoadPhotoWindow,
} from '../actions/actions';

const initialState = {
    step: 1,
    photo: null,
    isLoading: false,
    error: '',
    isAdminLoad: false,
    selectedUserByAdmin: {},
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
        setIsAdminLoad(state, action) {
            return {
                ...state,
                isAdminLoad: action.payload,
            };
        },
        setSelectedUserByAdmin(state, action) {
            return {
                ...state,
                selectedUserByAdmin: action.payload,
            };
        },
    },
});

export const {
    setStep,
    setIsLoading,
    setPhoto,
    setError,
    setStateToDefault,
    setIsAdminLoad,
    setSelectedUserByAdmin,
} = loadPhotoSlice.actions;

export const loadPhotoAction = (photoData) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        // запрос
        if (!/png|jpg|heic/.test(photoData.name.split('.').pop()))
            throw new Error('Такой формат не поддерживается.');

        dispatch(setPhoto(photoData));
        setTimeout(() => {
            dispatch(setStep(2));
            dispatch(setIsLoading(false));
        }, 500);
    } catch (error) {
        dispatch(setError(error.message));
        dispatch(setIsLoading(false));
    }
};

export const confirmPhotoAction = () => async (dispatch, getState) => {
    try {
        const {photo, isAdminLoad} = getState();
        // запрос на подтверждение фотки start
        if (isAdminLoad) {
            // запрос админской загрузки
            dispatch(setStep(3))
        } else {
            // запрос обычного пользователя загрузки
            dispatch(setStep(3));
            dispatch(
                // dispatch(setUserPhotoModeration({finished: false, photo: photo}));
                setUserPhotoModeration({
                    finished: false,
                    photo: photo,
                    message:
                        'Такой формат не поддерживается. Поддерживаемые форматы: PNG, JPG, HEIC',
                })
            );
        }
        // запрос на подтверждение фотки end
    } catch (error) {
        console.log(error);
    }
};

export const cancelUserPhotoModeration = () => async (dispatch) => {
    try {
        // запрос на отмену модерации фотки

        // запрос на отмену модерации фотки end

        dispatch(setUserPhotoModeration({}));
    } catch (error) {
        console.log(error);
    }
};

export const openLoadUserPhotoPopupAsAdmin = () => (dispatch) => {
    dispatch(setIsAdminLoad(true));
    dispatch(showLoadPhotoWindow(true));
};

export const closeLoadUserPhotoPopupAsAdmin = () => (dispatch) => {
    dispatch(setIsAdminLoad(false));
    dispatch(showLoadPhotoWindow(false));
};

export const loadPhoto = loadPhotoSlice.reducer;
