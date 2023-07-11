export const SET_INFO_ACCOUNT = '@@infoAccount/SET_INFO_ACCOUNT';
export const SET_ERROR = '@@infoAccount/SET_ERROR';
export const SET_LOADING = '@@infoAccount/SET_LOADING';

const setInfoAccount = (info) => ({
    type: SET_INFO_ACCOUNT,
    payload: info,
});

const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
});
const setLoading = (status) => ({
    type: SET_LOADING,
    payload: status,
});

export const getInfoAccount = (token) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await fetch(
            'https://gateway.scan-interfax.ru/api/v1/account/info',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        const data = await response.json();
        const { eventFiltersInfo } = data;
        if (response.ok) {
            dispatch(setInfoAccount(eventFiltersInfo));
            dispatch(setLoading(false));
        } else {
            const { message } = data;
            console.log(data, 'error from info in else');
            dispatch(setError(message));
            dispatch(setLoading(false));
        }
    } catch (error) {
        console.log(error, 'error from info in catch');
        dispatch(setError('Что-то пошло не так'));
        dispatch(setLoading(false));
    }
};
