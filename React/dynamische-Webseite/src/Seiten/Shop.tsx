import './stylesheets/shop.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Produkt = {
  id: number,
  name: string,
  price: number
}

export function Shop () {
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
    <h1 className="shop-title">Ocean Dive Shop</h1>
    <section className="category">
    <h2>Ausrüstung</h2>
    <div className="grid">
      <div className="card">
        <div className = 'info-wrapper'>
          <span className = 'info-icon'>ℹ️</span>
          <div className='info-badge'>Die ProDive Tauchmaske bietet dir kristallklare Sicht unter Wasser dank gehärtetem Glas und beschlagfreier Beschichtung. Ihr komfortabler Silikonrand sorgt für einen dichten Sitz ohne Druckstellen – ideal für lange Tauchgänge und Schnorcheltouren. Perfekt für Einsteiger und Profis.</div>
        </div>

        <span className="badge">Bestseller</span>
        <img src="/tauchmaske.png" alt="Tauchmaske" />
        <h3 className = 'shop_h3'>Tauchmaske</h3>
        <div className="price">€49,99</div>
        <button className="btn" onClick={() => addToCart({id: 1, name: 'ProDive Maske', price: 49.99})}>In den Warenkorb</button>
      </div>

      <div className="card">
        <img src="/flossen.png" alt="Speed Fins"/>
        <h3 className = 'shop_h3'>Speed Fins</h3>
        <div className="price">€79,95</div>
        <button className="btn" onClick={() => addToCart({id: 2, name: 'Speed Fins', price: 79.95})}>In den Warenkorb</button>
      </div>

      <div className="card">
        <img src="/neopren.png" alt="Neoprenanzug"/>
        <h3 className = 'shop_h3'>Neoprenanzug</h3>
        <div className="price">€129,00</div>
        <button className="btn" onClick={() => addToCart({id: 3, name: 'Neoprenanzug', price: 129.00})}>In den Warenkorb</button>
      </div>

      <div className="card">
        <img src="/kinderanzug.png" alt="KidFlex Anzug"/>
        <h3 className = 'shop_h3'>KidFlex Anzug</h3>
        <div className="price">€99,00</div>
        <button className="btn" onClick={() => addToCart({id: 4, name: 'KidFlex Anzug', price: 99.00})}>In den Warenkorb</button>
      </div>
    </div>
  </section>


  <section className="category">
    <h2>Technik</h2>
    <div className="grid">
      <div className="card">
        <span className="badge">Neu</span>
        <img src="/gps-tracker.png" alt="GPS-System"/>
        <h3 className = 'shop_h3'>GPS-System</h3>
        <div className="price">€249,00</div>
        <button className="btn" onClick={() => addToCart({id: 5, name: 'GPS-System', price: 249.00})}>In den Warenkorb</button>
      </div>

      <div className="card">
        <img src="/tauchlampe.png" alt="SeaLight 3000"/>
        <h3 className = 'shop_h3'>SeaLight 3000</h3>
        <div className="price">€59,00</div>
        <button className="btn" onClick={() => addToCart({id: 6, name: 'SeaLight 3000', price: 59.00})}>In den Warenkorb</button>
      </div>

      <div className="card">
        <img src="/actioncam.png" alt="Action Cam"/>
        <h3 className = 'shop_h3'>ActionCam DiveX</h3>
        <div className="price">€199,00</div>
        <button className="btn" onClick={() => addToCart({id: 7, name: 'ActionCam DiveX', price: 199.00})}>In den Warenkorb</button>
      </div>

      <div className="card">
        <img src="/kompass.png" alt="Aqua Kompass"/>
        <h3 className = 'shop_h3'>Aqua-Kompass</h3>
        <div className="price">€49,99</div>
        <button className="btn" onClick={() => addToCart({id: 8, name: 'Aqua-Kompass', price: 49.99})}>In den Warenkorb</button>
      </div>
    </div>
  </section>

  <section className="category">
    <h2>Zubehör</h2>
    <div className="grid">
      <div className="card">
        <img src="/messer.png" alt="SteelSharp"/>
        <h3 className = 'shop_h3'>SteelSharp Messer</h3>
        <div className="price">€34,95</div>
        <button className="btn" onClick={() => addToCart({id: 9, name: 'Steelsharp Messer', price: 34.95})}>In den Warenkorb</button>
      </div>

      <div className="card">
        <img src="/handschuhe.png" alt="SafetyFloat"/>
        <h3 className = 'shop_h3'>Safety Gloves</h3>
        <div className="price">€24,90</div>
        <button className="btn" onClick={() => addToCart({id: 10, name: 'Safety Gloves', price: 24.90})}>In den Warenkorb</button>
      </div>

      <div className="card">
        <span className="badge">Sale</span>
        <img src="/sauerstoff.png" alt="Sauerstoff-Flasche"/>
        <h3 className = 'shop_h3'>Sauerstoff-Flasche</h3>
        <div className="price">€79,00</div>
        <button className="btn" onClick={() => addToCart({id: 11, name: 'Sauerstoff-Flasche', price: 79.00})}>In den Warenkorb</button>
      </div>
      
      <div className="card">
        <img src="/rucksack.png" alt="Backpack"/>
        <h3 className = 'shop_h3'>Backpack 40l</h3>
        <div className="price">€44,90</div>
        <button className="btn" onClick={() => addToCart({id: 12, name: 'Backpack 40l', price: 44.90})}>In den Warenkorb</button>
      </div>
    </div>
  </section>

  <button className="cart-button" onClick={() => navigate('/Warenkorb')}>
  🛒 Warenkorb ({cart.length})
</button>

  </main>
  </>

    )
}