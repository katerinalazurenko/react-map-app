import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { tableReducer } from './reducers/TableSlice';
import rootSaga from "./sagas";
import {mapReducer} from "./reducers/MapSlice";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    table: tableReducer,
    map: mapReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({thunk: false}), sagaMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);


