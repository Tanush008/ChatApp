import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './App.css';
import store from './store/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx';
import persistStore from 'redux-persist/es/persistStore';

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);