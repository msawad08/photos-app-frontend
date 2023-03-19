import { configureStore, ThunkAction, Action, Middleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';  
import rootSaga from '../sagas/indexSaga';
import userReducer from '../reducers/userReducer';
import appReducer from '../reducers/appReducer';
import { createLogger } from 'redux-logger'
import photosReducer from '../reducers/photosReducer';

const sagaMiddleware = createSagaMiddleware();

let middlewares: Array<Middleware> = [
  sagaMiddleware,
]

if(process.env.NODE_ENV !== "production"){
  const logger = createLogger();
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    photo: photosReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: false}).concat(...middlewares),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
