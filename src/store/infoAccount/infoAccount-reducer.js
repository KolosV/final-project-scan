import { SET_ERROR, SET_INFO_ACCOUNT, SET_LOADING } from './infoAccount-actions';

const initialState = {
    usedCompany: null,
    limitCompany: null,
    isLoading: true,
    error: '',
};

export const infoAccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INFO_ACCOUNT: {
            return {
                ...state,
                usedCompany: action.payload.usedCompanyCount,
                limitCompany: action.payload.companyLimit,
                isLoading: false,
                error: '',
            };
        }
        case SET_ERROR: {
            return {
                ...state,
                error: action.payload,
            };
        }
        case SET_LOADING: {
            return {
                ...state,
                isLoading: action.payload,
            };
        }
        default:
            return state;
    }
};
