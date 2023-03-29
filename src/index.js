import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import UserStore from './store/UserStore'
import ProductStore from './store/ProductStore'
import MainStore from './store/MainStore'

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Context.Provider value={{
        main: new MainStore(),
        user: new UserStore(),
        products: new ProductStore()
      }}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </Context.Provider>
    </React.StrictMode>
);

