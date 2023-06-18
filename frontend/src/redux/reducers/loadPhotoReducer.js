import { createSlice } from '@reduxjs/toolkit';
import {
    auth, player,
    setUserPhotoModeration,
    showLoadPhotoWindow,
} from '../actions/actions';
import {authService} from "../../services/AuthService";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";

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


export const loadPhotoAction = (photoData, user) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        if (!/png|jpg|heic/.test(photoData.name.split('.').pop())) {
            throw new Error('Такой формат не поддерживается.');
        }
        let response = await authDecoratorWithoutLogin(authService.checkUserPhoto, {...user, upload_photo: photoData});
        if (response.data.errors.length) {
            let errors = response.errors.data.map((error) => error.name);
            throw new Error(errors.join(", "));
        } else {
            dispatch(setPhoto(response.data.photo));
            setTimeout(() => {
                dispatch(setStep(2));
                dispatch(setIsLoading(false));
            }, 500);
        }
    } catch (error) {
        dispatch(setError(error.message));
        dispatch(setIsLoading(false));
    }
};

export const confirmPhotoAction = (user) => async (dispatch, getState) => {
    try {
        const state = getState();
        const {isAdminLoad, photo} = state.loadPhoto;
        // запрос на подтверждение фотки start
        let response = await authDecoratorWithoutLogin(authService.confirmUserPhoto, {...user, is_admin_load: isAdminLoad});
        dispatch(setStep(3));

        if (isAdminLoad) {
            console.log('admin load action')
            // запрос админской загрузки
            // dispatch(setStep(3))
        } else {
            console.log('user load action')
            // запрос обычного пользователя загрузки
            // dispatch(setStep(3));
            dispatch(setUserPhotoModeration({finished: false,photo: photo, message:'Такой формат не поддерживается. Поддерживаемые форматы: PNG, JPG, HEIC',}));
        }
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
