import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import reducer from './Reducers/AppReducer';

const rootReducer = combineReducers({
  home: reducer,
  form: formReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;