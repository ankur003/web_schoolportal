import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import loginReducer from './Redux/Reducers/loginReducer';
import manageClassesReducer from './Redux/Reducers/manageClassesReducer';

const rootReducer = combineReducers({
    loginReducer,
    manageClassesReducer
});

const middleware = [thunk];

if (process.env.NODE_ENV !== 'development') {
    middleware.push(logger)
}

// const store = createStore(rootReducer,applyMiddleware(...middleware));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));


export default store;