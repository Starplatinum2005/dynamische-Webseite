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
  let total;
  if(localStorage.getItem('eingeloggt') === 'true'){
    total = cart.reduce((sum, item) => sum + item.price, 0) * 0.9; // Rabatt wurde hinzugefügt
  }else{
    total = cart.reduce((sum, item) => sum + item.price, 0);
  }
  const handleBezahlen = () => {
    if (localStorage.getItem('eingeloggt') === 'true') {
      Swal.fire({
      title: 'Vielen Dank für Ihren Einkauf!',
      icon: 'success',
      confirmButtonText: 'OK'
      });
      clearCart();
      navigate('/');
    } else {
      Swal.fire({
        title: 'Rabattcode verfügabr!',
        text: 'Melde dich an um 10% Rabatt auf diesen Einkauf zu erhalten',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Einloggen',
        cancelButtonText: 'Nein danke!'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        navigate('/');
        Swal.fire({
          title: 'Vielen Dank für Ihren Einkauf!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
          clearCart();
        }
      });
    };
  }

  let content;
  if (cart.length === 0) {
    content = <p className="warenkorb-leer">Warenkorb ist leer.</p>;
  } else {
    content = (
      <ul className="warenkorb-liste">
        {cart.map((item, index) => (
          <li key={index} className="warenkorb-item">
            <span>{item.name} – €{item.price.toFixed(2)}</span>
            <button className="entfernen-button" onClick={ () => removeFromCart(index)}>
              Entfernen
            </button>
          </li>
        ))}
      </ul>
    );
  }
  

   
  return (
    <>
      <main className="warenkorb-main">
        <h1 className="warenkorb-titel">🛒 Dein Warenkorb</h1>
        {content}

        {cart.length > 0 && (
          <div className="cart-total">
            <strong>Gesamt:</strong> €{total.toFixed(2)}
          </div>
        )}
  
        {cart.length > 0 && (
          <button className="warenkorb-leeren-button" onClick={clearCart}>
            🗑️ Warenkorb leeren
          </button>
        )}
        <div className='bezahlen-container'>
          <button className='bezahlen-button' onClick={handleBezahlen}>
            Jetzt Bezahlen
          </button>
        </div>
      </main>
    </>
  );
}