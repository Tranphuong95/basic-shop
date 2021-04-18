import './App.scss';
import React from 'react';
import OrderProduct from './Component/OrderProduct/OrderProduct';
import Toast from './Component/Toast/Toast';
import Header from './module/Header';
import Routes from './Routes';
const App = () => {

  const onOpenModal = () => {
    document.getElementById('checkout-cart').style.display = "block";
  }
  return (
    <div className="app">
      <Toast />
      <OrderProduct />
      <Header onOpenModal={onOpenModal} />
      <Routes />
    </div>
  );
};

export default App;