import { useEffect, useState } from 'react';
import './stylesheets/warenkorb.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : '/api';

type Produkt = {
  id: number;
  name: string;
  price: number;
  image?: string; 
};

export function Warenkorb() {
  const [cart, setCart] = useState<Produkt[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);

    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
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
  let total;
  if(isLoggedIn){
    total = cart.reduce((sum, item) => sum + item.price, 0) * 0.9; 
  }else{
    total = cart.reduce((sum, item) => sum + item.price, 0);
  }

  const handleBezahlen = async () => {
    if (isLoggedIn) {
      // 1. User aus dem LocalStorage holen
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;

      if (!user) return;

      // 2. Aktuelles Datum für die MySQL Datenbank formatieren (YYYY-MM-DD HH:MM:SS)
      const aktuellesDatum = new Date().toISOString().slice(0, 19).replace('T', ' ');

      // 3. Warenkorb-Liste in exakt das Format übersetzen, das dein Controller erwartet!
      const produkteFuerDb = cart.reduce((acc: any[], item) => {
        // Wir suchen, ob das Produkt schon zusammengefasst wurde
        const existing = acc.find(p => p.Artikelnummer === item.id);
        if (existing) {
          existing.Menge += 1;
        } else {
          // ACHTUNG: Hier nutzen wir jetzt 'Artikelnummer' und 'Menge' (genau wie in deinem req.body)
          acc.push({ Artikelnummer: item.id, Menge: 1 });
        }
        return acc;
      }, []);

      try {
        // 4. Exakt das JSON-Objekt bauen, das dein bestellungController.js verlangt
        const response = await fetch(`${API_BASE_URL}/bestellungen`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Bestellungsdatum: aktuellesDatum,
            Bestellstatus: 'In Bearbeitung',
            User_ID: user.id, // Die ID aus deinem eingeloggten User
            produkte: produkteFuerDb,
            kurse: [] // Aktuell leer, da wir im Shop nur Produkte kaufen
          })
        });

        if (response.ok) {
          Swal.fire({
            title: 'Vielen Dank für Ihren Einkauf!',
            text: 'Deine Bestellung wurde sicher in der Datenbank hinterlegt.',
            icon: 'success',
            confirmButtonText: 'Klasse!'
          });
          clearCart();
          navigate('/');
        } else {
          Swal.fire('Fehler', 'Bestellung konnte nicht gespeichert werden.', 'error');
        }
      } catch (error) {
        console.error("Fehler beim Checkout:", error);
        Swal.fire('Fehler', 'Server ist nicht erreichbar.', 'error');
      }

    } else {
      Swal.fire({
        title: 'Rabattcode verfügbar!',
        text: 'Melde dich an, um 10% Rabatt auf diesen Einkauf zu erhalten!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Einloggen',
        cancelButtonText: 'Nein danke!'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({ title: 'Vielen Dank für Ihren Einkauf!', icon: 'success', confirmButtonText: 'OK' });
          clearCart();
          navigate('/');
        }
      });
    }
  };

  return (
    <main className="warenkorb-main">
      <h1 className="warenkorb-titel">🛒 Dein Warenkorb</h1>
      
      {cart.length === 0 ? (
        <p className="warenkorb-leer">Warenkorb ist leer.</p>
      ) : (
        <ul className="warenkorb-liste">
          {cart.map((item, index) => (
            <li key={index} className="warenkorb-item">
              <span>{item.name} – {item.price.toFixed(2)} €</span>
              <button className="entfernen-button" onClick={() => removeFromCart(index)}>
                Entfernen
              </button>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <>
          <div className="cart-total" style={{ marginTop: '20px', fontSize: '1.2rem' }}>
            {isLoggedIn && <span style={{ color: '#2ecc71', display: 'block', fontSize: '1rem' }}>🎉 10% Mitglieder-Rabatt angewendet!</span>}
            <strong>Gesamt:</strong> {total.toFixed(2)} €
          </div>
    
          <button className="warenkorb-leeren-button" onClick={clearCart} style={{ marginRight: '10px' }}>
            🗑️ Warenkorb leeren
          </button>
          
          <button className='bezahlen-button' onClick={handleBezahlen}>
            Jetzt Bezahlen
          </button>
        </>
      )}
    </main>
  );
}