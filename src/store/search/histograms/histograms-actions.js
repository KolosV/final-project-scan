export const SET_HISTOGRAMS = '@@histograms/SET_HISTOGRAMS';
export const SET_STATUS = '@@histograms/SET_STATUS';
export const SET_ERROR = '@@histograms/SET_ERROR';

const setHistorgams = (data) => ({
    type: SET_HISTOGRAMS,
    payload: data,
});
const setStatus = (status) => ({
    type: SET_STATUS,
    payload: status,
});
const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
});

export const getHistograms = (token, searchData) => async (dispatch) => {
    const { inn, tonality, countDocs, dateSearch, searchParams } = searchData;
    dispatch(setStatus('loading'));
    dispatch(setError(''));
    try {
        const response = await fetch(
            'https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    issueDateInterval: {
                        startDate: `${dateSearch.from}T00:00:00+03:00`, // дата из формы from
                        endDate: `${dateSearch.to}T23:59:59+03:00`, // дата из формы to
                    },
                    searchContext: {
                        targetSearchEntitiesContext: {
                            targetSearchEntities: [
                                {
                                    type: 'company', //дэфолт
                                    sparkId: null, //дэфлдт
                                    entityId: null, //дэфолт
                                    inn, //получаем из формы, поле - ИНН
                                    maxFullness: searchParams.maxFullness, //Признак максимальной полноты - из чекбокса
                                    inBusinessNews: searchParams.inBusinessNews, //Упоминания в бизнес-контексте из чекбокса
                                },
                            ],
                            onlyMainRole: searchParams.onlyMainRole, //Главная роль в публикации из чек бокса
                            tonality, // тональность из формы
                            onlyWithRiskFactors: searchParams.onlyWithRiskFactors, //Публикации только с риск-факторами из чек бокса
                        },
                    },
                    attributeFilters: {
                        excludeTechNews: true,
                        excludeAnnouncements: true,
                        excludeDigests: true,
                    },
                    similarMode: 'duplicates', //+
                    limit: +countDocs, //из поля количество документов
                    sortType: 'issueDate', //+
                    sortDirectionType: 'desc',
                    intervalType: 'month', //+
                    histogramTypes: ['totalDocuments', 'riskFactors'], //+
                }),
            },
        );
        const json = await response.json();

        if (response.ok) {
            const { data } = json;
            dispatch(setHistorgams(data));
            dispatch(setStatus('completed'));
        } else {
            const { message } = json();
            dispatch(setError(message));
            dispatch(setStatus('error'));
        }
    } catch (error) {
        dispatch(setStatus('error'));
        dispatch(setError('Что-то пошло не так'));
    }
};
