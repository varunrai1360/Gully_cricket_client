import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import { Authenticate } from './redux/Reducers/Authenticate';
import thunk from 'redux-thunk';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console(e)
  }
};






const rootReducer = combineReducers({
  data:Authenticate,
})

const peristedState = loadState();

const store = createStore(
  rootReducer,
  peristedState,
  applyMiddleware(thunk));


  store.subscribe(() => {
    saveState(store.getState());
  });

ReactDOM.render(
  
  <Provider store={store}>
    <App />
    </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
