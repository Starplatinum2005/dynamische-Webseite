import { useEffect, useState } from 'react';
import './stylesheets/warenkorb.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

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
      const navigate = useNavigate();
      const handleBezahlen = () => {
        if (localStorage.getItem('eingeloggt') === 'true') {
          Swal.fire({
          title: 'Vielen Dank für Ihren Einkauf!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        navigate('/')
        } else {
          Swal.fire({
            title: 'Rabattcode verfügabr!',
            text: 'Melde dich an um 10% Rabatt auf diesen Einkauf zu erhalten',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Einloggen',
            cancelButtonText: 'Nein danke, ich bin zurückgeblieben!'
          }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        navigate('/')
        Swal.fire({
          title: 'Vielen Dank für Ihren Einkauf!',
          icon: 'success',
          confirmButtonText: 'OK'
          })
      }
    });
          };
        }

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
          <div className='bezahlen-container'>
            <button className='bezahlen-button' onClick={handleBezahlen}>
              Jetzt Bezahlen
            </button>
          </div>
        </main>
      );
    }