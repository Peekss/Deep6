import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const reducer = combineReducers(reducers);
const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware),
);

export default store;
