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

    let content;
    if (cart.length === 0) {
      content = <p className="cart-empty">Warenkorb ist leer.</p>;
    } else {
      content = (
        <ul className="cart-list">
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              {item.name} – €{item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      );
    }

    return (
        <main className="cart-main">
          <h1 className="cart-title">🛒 Dein Warenkorb</h1>
          {content}
    
          {cart.length > 0 && (
            <button className="clear-cart-button" onClick={clearCart}>
              🗑️ Warenkorb leeren
            </button>
          )}
        </main>
      );
    }