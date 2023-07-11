import { SET_DOCUMENTS, SET_ERROR, SET_STATUS } from './documents-actions';

const initialState = {
    status: 'loading',
    error: '',
    documents: [],
};

export const documentsReducer = (state = initialState, action) => {
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
        case SET_DOCUMENTS: {
            return {
                ...state,
                documents: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};
