import { createSlice } from '@reduxjs/toolkit';
import {
    setUserPhotoModeration,
    showLoadPhotoWindow, player
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


export const loadPhotoAction = (photoData, user, isAdmin) => async (dispatch) => {
    dispatch(setIsLoading(true));
    console.log(photoData)
    try {
        if (!/png|jpg|jpeg|heic/.test(photoData.name.split('.').pop().toLowerCase())) {
            throw new Error('Такой формат не поддерживается.');
        }
        let response = await authDecoratorWithoutLogin(authService.checkUserPhoto, {id: user.id, upload_photo: photoData});
        console.log(response)
        if (response.data.errors.length) {
            let errors = response.data.errors.map((error) => error.name);
            if (!isAdmin) {
                dispatch(player({...user, photo_errors: []}));
            }
            throw new Error(errors.join(", "));
        } else {
            if (!isAdmin) {
                dispatch(player({...user, photo: response.data.photo, photo_errors: []}));
            }
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
        let response = await authDecoratorWithoutLogin(authService.confirmUserPhoto, {id: user.id, is_admin_load: isAdminLoad});
        dispatch(setStep(3));

        if (isAdminLoad) {
            console.log('admin load action')
            // запрос админской загрузки
            // dispatch(setStep(3))
        } else {
            console.log('user load action')
            // запрос обычного пользователя загрузки
            // dispatch(setStep(3));
            dispatch(setUserPhotoModeration({
                is_accept_photo: false,
                photo: photo,
                small_card_photo: photo,
                overlay_photo: photo,
                big_card_photo: photo,
            }));
            dispatch(player({
                ...user,
                is_accept_photo: false,
                photo: photo,
                small_card_photo: photo,
                overlay_photo: photo,
                big_card_photo: photo,

        }));
        }
    } catch (error) {
        console.log(error);
    }
};

export const cancelUserPhotoModeration = (user) => async (dispatch) => {
    try {
        authDecoratorWithoutLogin(authService.cancelUserPhoto, {});
        dispatch(player({
                ...user, 
                is_accept_photo: false,
                photo: false,
                small_card_photo: false,
                overlay_photo: false,
                big_card_photo: false,
        }));

        dispatch(setUserPhotoModeration({
            is_accept_photo: false,
            photo: false,
            small_card_photo: false,
            overlay_photo: false,
            big_card_photo: false,
        }));
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
