import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { companieReducer } from './reducers';

const rootReducer = combineReducers({
  reducer: companieReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
