import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/global.css'
import Rotas from './rotas.js';
import { CartProvider } from './context/cart-context.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <Rotas />
  </CartProvider>

);

