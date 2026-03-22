import './stylesheets/Shop.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Artikel } from '../Komponente/Artikel';

const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : '/api';

export type Produkt = {
  id: number;
  name: string;
  price: number;
  image: string;
  Bestseller?: boolean;
};

export function Shop() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Produkt[]>([]);
  
  const [dbProdukte, setDbProdukte] = useState<Produkt[]>([]);

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(existingCart);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/produkte`)
        .then(res => res.json())
        .then((data: any[]) => {
            const formatierteProdukte = data.map(p => ({
                id: p.Artikelnummer,
                name: p.Bezeichnung,
                price: parseFloat(p.Preis),
                image: p.Bildpfad,
                Bestseller: p.Bestseller === 1
            }));
            
            setDbProdukte(formatierteProdukte);
        })
        .catch(err => console.error("Datenbank-Fehler:", err));
  }, []);


  const addToCart = (product: Produkt) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(product);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setCart(existingCart);
  };

  const ausruestung = dbProdukte.slice(0, 4);
  const technik = dbProdukte.slice(4, 8);
  const zubehoer = dbProdukte.slice(8, 12);

  return (
    <>
      <main className='Shop_main'>
        <h1 className="shop-titel">Ocean Dive Shop</h1>

        {dbProdukte.length > 0 ? (
          <>
            <section className="kategorie">
              <h2>Ausrüstung</h2>
              <div className="grid">
                {ausruestung.map(p => <Artikel key={p.id} product={p} addToCart={addToCart} />)}
              </div>
            </section>

            <section className="kategorie">
              <h2>Technik</h2>
              <div className="grid">
                {technik.map(p => <Artikel key={p.id} product={p} addToCart={addToCart} />)}
              </div>
            </section>

            <section className="kategorie">
              <h2>Zubehör</h2>
              <div className="grid">
                {zubehoer.map(p => <Artikel key={p.id} product={p} addToCart={addToCart} />)}
              </div>
            </section>
          </>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '50px' }}>Lade Tauch-Equipment...</p>
        )}

        <button className="cart-button" onClick={() => navigate('/Warenkorb')}>
          🛒 Warenkorb ({cart.length})
        </button>
      </main>
    </>
  );
}