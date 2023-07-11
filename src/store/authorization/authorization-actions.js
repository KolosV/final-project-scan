import { getInfoAccount } from '../infoAccount/infoAccount-actions';

export const SET_STATUS = '@@auth/SET_STATUS';
export const SET_ERROR = '@@auth/SET_ERROR';
export const SET_AUTHORIZATION = '@@auth/SET_AUTHORIZATION';
export const RESET_AUTHORIZATION = '@@auth/RESET_AUTHORIZATION';
export const LOCAL_AUTH = '@@auth/LOCAL_AUTH';

//action for error
const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
});

//action for status
const setStatus = (status) => ({
    type: SET_STATUS,
    payload: status,
});

//action for auth
const setAuthorization = (data) => ({
    type: SET_AUTHORIZATION,
    payload: data,
});

export const resetAuthorization = () => ({
    type: RESET_AUTHORIZATION,
});
export const localAuth = () => ({
    type: LOCAL_AUTH,
});

//thunk action for auth
export const checkUserAuth =
    ({ login, password }) =>
    async (dispatch) => {
        dispatch(setStatus('loading'));
        dispatch(setError(false))
        try {
            const response = await fetch(
                'https://gateway.scan-interfax.ru/api/v1/account/login',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        login,
                        password,
                    }),
                },
            );
            const data = await response.json();
            if (response.ok) {
                const { accessToken, expire } = data;
                dispatch(
                    setAuthorization({
                        token: accessToken,
                        timeToDeath: expire.slice(0, 10),
                    }),
                );
                dispatch(getInfoAccount(accessToken));
                dispatch(setStatus('completed'));
            } else {
                const { message } = data;
                dispatch(setStatus('error'));
                dispatch(setError(message.slice(0, 30)));
            }
        } catch (error) {
            dispatch(setStatus('error-catch'));
            dispatch(setError('Что-то пошло не так'));
        }
    };
