// Hooks
import { useEffect, useState } from "react";
// Componentes
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
// Varios
import db from "./data/db";
// Estilos

const App = () => {
  // Definición del hook
  const [data, setData] = useState(db);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) ?? []);

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  // Datos persistentes para el carrito de compras
  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart))
  },[cart])

  
  // Funciones para el carrito
  const addToCart = (item) => {
    // Si exise un elementp dentro de nuesyro carro
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    // si no exite, se agrega al carrito, en caso de queexistase aumenta la cantidad
    if (itemExist >= 0) {
      if(cart[itemExist].quantity >= MAX_ITEMS){
        return
      }
      const updateCart = [...cart];
      updateCart[itemExist].quantity++;
      setCart(updateCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }

  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  };

  const increaseQuantityFromCart = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS ) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    setCart(updatedCart);
  };

  const removeQuantityFromCart = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    setCart(updatedCart);
  };

  const emptyCart = ()=>{
    setCart([])
  }

  // Fin funciones para el carrito

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantityFromCart={increaseQuantityFromCart}
        removeQuantityFromCart={removeQuantityFromCart}
        emptyCart={emptyCart}
      />
      <Main 
        data={data} 
        addToCart={addToCart} 
      />
      <Footer />
    </>
  );
};

export default App;
