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
                    media: {
                        // ...state.user.media,
                        moderation: action.value,
                    },
                },
            };
        default:
            return state;
    }
};
