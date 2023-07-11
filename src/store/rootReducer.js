import { combineReducers } from 'redux';
import { authorizationReducer } from './authorization/authorization-reducer';
import { infoAccountReducer } from './infoAccount/infoAccount-reducer';
import { documentsReducer } from './search/documents/documents-reducer';
import { histogramsReducer } from './search/histograms/histograms-reducer';
import { publicationsReducer } from './search/objectsearch/objectsearch-reducer';

export const rootReducer = combineReducers({
    auth: authorizationReducer,
    infoAccount: infoAccountReducer,
    histograms: histogramsReducer,
    publications: publicationsReducer,
    documents: documentsReducer,
});
