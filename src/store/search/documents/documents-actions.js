export const SET_DOCUMENTS = '@@documents/SET_DOCUMENTS';
export const SET_STATUS = '@@documents/SET_STATUS';
export const SET_ERROR = '@@documents/SET_ERROR';

const setDocuments = (value) => ({
    type: SET_DOCUMENTS,
    payload: value,
});
const setStatus = (status) => ({
    type: SET_STATUS,
    payload: status,
});
const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
});

export const getDocuments = (token, ids) => async (dispatch) => {
    dispatch(setStatus('loading'));
    dispatch(setError(''));
    try {
        const response = await fetch(
            'https://gateway.scan-interfax.ru/api/v1/documents',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ids }),
            },
        );
        const json = await response.json();
        if (response.ok) {
            const result = [];
            json.forEach(({ ok }) => {
                result.push(ok);
            });
            dispatch(setDocuments(result));
            dispatch(setStatus('completed'));
        } else {
            const { message } = json();
            dispatch(setError(message));
            dispatch(setStatus('error'));
            console.log(message);
        }
    } catch (error) {
        console.log(error);
        dispatch(setStatus('error'));
        dispatch(setError('Что-то пошло не так'));
    }
};
