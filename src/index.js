// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// // import { Provider } from 'react-redux';
// // import store from './store'

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react'
// import { render } from 'react-dom'
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import AppComponent from './App'
import { BrowserRouter } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';
import rootReducers from './reducers'

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

// const store = createStore(
//   rootReducers,
//   applyMiddleware(...middleware),
// )

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);
const store = createStore(rootReducers, enhancer);

const rootEl = document.getElementById('root')
const render = Component => ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Component />
    </Provider>
  </BrowserRouter>,
  rootEl
);
render(AppComponent)