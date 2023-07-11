import {
    LOCAL_AUTH,
    RESET_AUTHORIZATION,
    SET_AUTHORIZATION,
    SET_ERROR,
    SET_STATUS,
} from './authorization-actions';

const initialState = {
    token: '' || localStorage.getItem('token'),
    timeOfDeathToken: '' || localStorage.getItem('token-time'),
    status: '', // 'loading' 'completed' 'error'
    error: false,
    isAuth: false,
};

export const authorizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR: {
            return {
                ...state,
                error: action.payload,
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.payload,
            };
        }
        case SET_AUTHORIZATION: {
            return {
                ...state,
                token: action.payload.token,
                timeOfDeathToken: action.payload.timeToDeath,
                error: false,
                isAuth: true,
            };
        }
        case RESET_AUTHORIZATION: {
            return initialState;
        }
        case LOCAL_AUTH: {
            return {
                ...state,
                isAuth: true,
            };
        }
        default:
            return state;
    }
};
