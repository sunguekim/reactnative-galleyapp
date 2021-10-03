import { configureStore, Action } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';


import rootReducer from './rootReducer'
import rootSaga from './saga/index'

const sagaMiddleware = createSagaMiddleware()


export const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware]
});

sagaMiddleware.run.call(store, rootSaga);


export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>