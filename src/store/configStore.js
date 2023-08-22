import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk"
import MainReducer from './reducers/MainReducer';
import GetCountryReducer from './reducers/GetCountryReducer';
import GetTarifsReducer from './reducers/GetTarifsReducer';
import ActivateTarifReducer from './reducers/ActivateTarifReducer';
import GetMyTarifeReducer from './reducers/GetMyTarifeReducer';

const rootReducer = combineReducers({
  mainData: MainReducer,
  getCountry: GetCountryReducer,
  getTarifs: GetTarifsReducer,
  activateTarif: ActivateTarifReducer,
  getMyTarife: GetMyTarifeReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
