import './stylesheets/shop.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Artikel } from '../Komponente/Artikel';
import { produkte } from '../Objects/Shop';

type Produkt = {
  id: number,
  name: string,
  price: number
}

export function Shop() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Produkt[]>([]);

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(existingCart);
  }, []);


  const addToCart = (product: Produkt) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(product);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setCart(existingCart);
  };


  return (
    <>
      <main className='Shop_main'>
        <h1 className="shop-titel">Ocean Dive Shop</h1>
        <section className="kategorie">
          <h2>Ausrüstung</h2>
          <div className="grid">
            <Artikel product={produkte.Produkt1} addToCart={addToCart} />
            <Artikel product={produkte.Produkt2} addToCart={addToCart} />
            <Artikel product={produkte.Produkt3} addToCart={addToCart} />
            <Artikel product={produkte.Produkt4} addToCart={addToCart} />
          </div>
        </section>

        <section className="kategorie">
          <h2>Technik</h2>
          <div className="grid">
            <Artikel product={produkte.Produkt5} addToCart={addToCart} />
            <Artikel product={produkte.Produkt6} addToCart={addToCart} />
            <Artikel product={produkte.Produkt7} addToCart={addToCart} />
            <Artikel product={produkte.Produkt8} addToCart={addToCart} />
          </div>
        </section>

        <section className="kategorie">
          <h2>Zubehör</h2>
          <div className="grid">
            <Artikel product={produkte.Produkt9} addToCart={addToCart} />
            <Artikel product={produkte.Produkt10} addToCart={addToCart} />
            <Artikel product={produkte.Produkt11} addToCart={addToCart} />
            <Artikel product={produkte.Produkt12} addToCart={addToCart} />
          </div>
        </section>

        <button className="cart-button" onClick={() => navigate('/Warenkorb')}>
          🛒 Warenkorb ({cart.length})
        </button>

      </main>
    </>

  )
}