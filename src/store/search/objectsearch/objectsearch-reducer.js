import { SET_ERROR, SET_PUBLICATIONS, SET_STATUS } from './objectsearch-actions';

const initialState = {
    status: 'loading',
    error: '',
    documents: [],
};

export const publicationsReducer = (state = initialState, action) => {
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
        case SET_PUBLICATIONS: {
            return {
                ...state,
                publications: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};
