import { AUTH } from '../actions/actions';
import { SET_USER_PHOTO_MODERATION } from '../actions/actions';

const initialAuthState = {
    isAuth: null,
    user: false,
};

export const user = (state = initialAuthState, action) => {
    switch (action.type) {
        case AUTH:
            return {
                ...state,
                isAuth: action.value,
                user: action.user,
            };
        case SET_USER_PHOTO_MODERATION:
            return {
                ...state,
                user: {
                    ...state.user,
                    is_accept_photo: action.value.is_accept_photo,
                    photo: action.value.photo,
                    small_cart_photo: action.value.small_card_photo,
                    overlay_photo: action.value.overlay_photo,
                    big_card_photo: action.value.photobig_card_photo,
                },
            };
        default:
            return state;
    }
};
