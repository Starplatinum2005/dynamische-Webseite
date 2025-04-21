import './stylesheets/shop.css';
import { products } from '../data/products';
import { useState } from 'react';



export function Shop () {

    const addToCart = (productName ) => {
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      const updateCart = [...existingCart, productName];
      localStorage.setItem('cart', JSON.stringify(updateCart));
      setCart(updateCart);
    };

    const [cart, setCart] = useState (() => {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    });

    return (
<<<<<<< HEAD
  <>
    
    <h1 className="shop-title">Ocean Dive Shop</h1>
    <section className="category">
    <h2>Ausrüstung</h2>
    <div className="grid">
      <div className="card">
        <span className="badge">Bestseller</span>
        <img src="/tauchmaske.png" alt="" />
        <h3>Tauchmaske</h3>
        <div className="price">€49,99</div>
        <button className="btn" onClick={() => addToCart({id: 1, name: 'ProDive Maske', price: 49.99})}>In den Warenkorb</button>
      </div>

      <div className="card">
        <img src="/flossen.png" alt="Speed Fins"/>
        <h3>Speed Fins</h3>
        <div className="price">€79,95</div>
        <button className="btn" onClick={() => addToCart({id: 1, name: 'Speed Fins', price: 79.95})}>In den Warenkorb</button>
      </div>

      <div className="card">
        <img src="/neopren.png" alt="Neoprenanzug"/>
        <h3>Neoprenanzug</h3>
        <div className="price">€129,00</div>
        <button className="btn" onClick={() => addToCart({id: 1, name: 'Neoprenanzug', price: 129.00})}>In den Warenkorb</button>
      </div>

      <div className="card">
        <img src="/kinderanzug.png" alt="KidFlex Anzug"/>
        <h3>KidFlex Anzug</h3>
        <div className="price">€99,00</div>
        <button className="btn" onClick={() => addToCart({id: 1, name: 'KidFlex Anzug', price: 99.00})}>In den Warenkorb</button>
      </div>
    </div>
  </section>


  <section className="category">
    <h2>Technik</h2>
    <div className="grid">
      <div className="card">
        <span className="badge">Neu</span>
        <img src="/gps-tracker.png" alt="DiveTech Pro"/>
        <h3>GPS-System</h3>
        <div className="price">€249,00</div>
        <button className="btn" onClick={() => addToCart({id: 1, name: 'GPS-System', price: 249.00})}>In den Warenkorb</button>
      </div>

      <div className="card">
        <img src="/tauchlampe.png" alt="SeaLight 3000"/>
        <h3>SeaLight 3000</h3>
        <div className="price">€59,00</div>
        <button className="btn" onClick={() => addToCart({id: 1, name: 'SeaLight 3000', price: 59.00})}>In den Warenkorb</button>
      </div>

      <div className="card">
        <img src="/actioncam.png" alt="Action Cam"/>
        <h3>ActionCam DiveX</h3>
        <div className="price">€199,00</div>
        <button className="btn" onClick={() => addToCart({id: 1, name: 'ActionCam DiveX', price: 199.00})}>In den Warenkorb</button>
      </div>

      <div className="card">
        <img src="/kompass.png" alt="Aqua Kompass"/>
        <h3>Aqua-Kompass</h3>
        <div className="price">€49,99</div>
        <button className="btn" onClick={() => addToCart({id: 1, name: 'Aqua-Kompass', price: 49.99})}>In den Warenkorb</button>
      </div>
    </div>
  </section>

  <section className="category">
    <h2>Zubehör</h2>
    <div className="grid">
      <div className="card">
        <img src="/messer.png" alt="SteelSharp"/>
        <h3>SteelSharp Messer</h3>
        <div className="price">€34,95</div>
        <button className="btn" onClick={() => addToCart({id: 1, name: 'Steelsharp Messer', price: 34.95})}>In den Warenkorb</button>
      </div>

      <div className="card">
        <img src="/handschuhe.png" alt="SafetyFloat"/>
        <h3>Safety Gloves</h3>
        <div className="price">€24,90</div>
        <button className="btn" onClick={() => addToCart({id: 1, name: 'Safety Gloves', price: 24.90})}>In den Warenkorb</button>
      </div>

      <div className="card">
        <span className="badge">Sale</span>
        <img src="/sauerstoff.png" alt="Snorkel Pro Set"/>
        <h3>Sauerstoff-Flasche</h3>
        <div className="price">€79,00</div>
        <button className="btn" onClick={() => addToCart({id: 1, name: 'Sauerstoff-Flasche', price: 79.00})}>In den Warenkorb</button>
      </div>
      
      <div className="card">
        <img src="/rucksack.png" alt="DryBag"/>
        <h3>Backpack 40l</h3>
        <div className="price">€44,90</div>
        <button className="btn" onClick={() => addToCart({id: 1, name: 'Backpack 40l', price: 44.90})}>In den Warenkorb</button>
      </div>
    </div>
  </section>

  <a href="#warenkorb" className="cart-button">
    🛒 Warenkorb ({cart.length})
  </a>
  </>

    )
}