import { useEffect, useState } from 'react';
import './stylesheets/warenkorb.css';

type Produkt = {
  id: number;
  name: string;
  price: number;
};

export function Warenkorb() {
    const [cart, setCart] = useState<Produkt[]>([]);
  
    useEffect(() => {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(savedCart);
    }, []);

    const clearCart = () => {
        localStorage.removeItem('cart');
        setCart([]);
      };

      const removeFromCart = (indexToRemove: number) => {
        const newCart = cart.filter((_, index) => index !== indexToRemove);
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
      };

    let content;
    if (cart.length === 0) {
      content = <p className="cart-empty">Warenkorb ist leer.</p>;
    } else {
      content = (
        <ul className="cart-list">
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <span>{item.name} – €{item.price.toFixed(2)}</span>
              <button className="remove-btn" onClick={ () => removeFromCart(index)}>
                Entfernen
              </button>
            </li>
          ))}
        </ul>
      );
    }
    


    const total = cart.reduce((sum, item) => sum + item.price, 0)

    

    return (
        <main className="cart-main">
          <h1 className="cart-title">🛒 Dein Warenkorb</h1>
          {content}

          {cart.length > 0 && (
            <div className="cart-total">
              <strong>Gesamt:</strong> €{total.toFixed(2)}
            </div>
          )}
    
          {cart.length > 0 && (
            <button className="clear-cart-button" onClick={clearCart}>
              🗑️ Warenkorb leeren
            </button>
          )}
        </main>
      );
    }