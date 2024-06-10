import { useEffect, useState, useMemo } from "react";
import db from "../data/db";

const useCart = () => {
  // Definición del hook
  const [data] = useState(db);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) ?? []
  );


  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  // Datos persistentes para el carrito de compras
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Funciones para el carrito
  const addToCart = (item) => {
    // Si exise un elementp dentro de nuesyro carro
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    // si no exite, se agrega al carrito, en caso de queexistase aumenta la cantidad
    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= MAX_ITEMS) {
        return;
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
      if (item.id === id && item.quantity < MAX_ITEMS) {
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

  const emptyCart = () => {
    setCart([]);
  };

  // Fin funciones para el carrito

  // Hooks Derivado
  const isEmpty = useMemo(() => cart.length > 0, [cart]);

  // Calculo del total a pagar
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );


  return {
    data, 
    cart, 
    addToCart,
    increaseQuantityFromCart,
    removeFromCart,
    removeQuantityFromCart, 
    emptyCart,
    isEmpty,
    cartTotal
    };
};

export default useCart;
