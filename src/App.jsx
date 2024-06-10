// Hooks
// Componentes
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
// hooks personalizados
import useCart from "./hooks/useCart";

const App = () => {
  const {data, 
    cart, 
    addToCart,
    increaseQuantityFromCart,
    removeFromCart,
    removeQuantityFromCart,
    emptyCart, 
    isEmpty,
    cartTotal
  } = useCart()

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantityFromCart={increaseQuantityFromCart}
        removeQuantityFromCart={removeQuantityFromCart}
        emptyCart={emptyCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
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
