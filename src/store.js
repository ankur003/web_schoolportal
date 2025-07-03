import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducer from './Redux/Reducers/loginReducer';
import manageClassesReducer from './Redux/Reducers/manageClassesReducer';
import entityReducer from './Redux/Reducers/entityReducer';

const rootReducer = combineReducers({
  loginReducer,
  manageClassesReducer,
  entityReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginReducer', 'manageClassesReducer', 'entityReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for redux-persist
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export default store;