import { SET_ERROR, SET_HISTOGRAMS, SET_STATUS } from '../histograms/histograms-actions';

const initialState = {
    status: '',
    error: '',
    histogramsResponse: [],
};

export const histogramsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATUS: {
            return {
                ...state,
                status: action.payload,
            };
        }
        case SET_ERROR: {
            return {
                ...state,
                error: action.payload,
            };
        }
        case SET_HISTOGRAMS: {
            return {
                ...state,
                histogramsResponse: action.payload,
            };
        }
        default:
            return state;
    }
};
