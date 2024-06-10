import React from "react";

const Cart = ({ guitar, removeFromCart, increaseQuantityFromCart,removeQuantityFromCart }) => {
  
  const { name, id, price, image, quantity } = guitar;
  
  return (
    <tr>
      <td>
        <img
          className="img-fluid"
          src={`/img/${image}.jpg`}
          alt="imagen guitarra"
        />
      </td>
      <td>{name}</td>
      <td className="fw-bold">{price}</td>
      <td className="flex align-items-start gap-4">
        <button type="button" className="btn btn-dark" onClick={()=>removeQuantityFromCart(id)}>
          -
        </button>
        {quantity}
        <button type="button" className="btn btn-dark" onClick={() =>increaseQuantityFromCart(id)}>
          +
        </button>
      </td>
      <td>
        <button 
          className="btn btn-danger" 
          type="button" onClick={()=>removeFromCart(id)} 
          > 
          X
        </button>
      </td>
    </tr>
  );
};

export default Cart;
