import './stylesheets/Shop.css';
import './stylesheets/Shop-Modal.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Artikel } from '../Komponente/Artikel';
import Swal from 'sweetalert2';

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
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    Bezeichnung: '',
    Beschreibung: '',
    Preis: '',
    Bestand: '',
    Bildpfad: '/placeholder.png',
    Bestseller: false
  });

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(existingCart);

    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.rolle === 1) setIsAdmin(true);
    }
    
    loadProdukte();
  }, []);

  const loadProdukte = () => {
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
  };

  const addToCart = (product: Produkt) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(product);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setCart(existingCart);
  };


  const handleAddProduct = () => {
    setShowAddProductModal(true);
  };

  const handleSaveProduct = async () => {
    if (!newProduct.Bezeichnung.trim() || !newProduct.Preis || !newProduct.Bestand) {
      Swal.fire('Fehler!', 'Bitte füllen Sie mindestens Name, Preis und Bestand aus.', 'error');
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/produkte`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Bezeichnung: newProduct.Bezeichnung,
          Beschreibung: newProduct.Beschreibung || 'Neu hinzugefügt durch Admin',
          Preis: parseFloat(newProduct.Preis),
          Bestand: parseInt(newProduct.Bestand),
          Bildpfad: newProduct.Bildpfad,
          Bestseller: newProduct.Bestseller ? 1 : 0
        })
      });
      Swal.fire('Angelegt!', 'Das Produkt wurde gespeichert.', 'success');
      setShowAddProductModal(false);
      setNewProduct({
        Bezeichnung: '',
        Beschreibung: '',
        Preis: '',
        Bestand: '',
        Bildpfad: '/placeholder.png',
        Bestseller: false
      });
      loadProdukte();
    } catch (err) {
      console.error(err);
      Swal.fire('Fehler!', 'Das Produkt konnte nicht gespeichert werden.', 'error');
    }
  };

  const handleEditProduct = async (p: Produkt) => {
    const { value: newPrice } = await Swal.fire({
      title: `${p.name} bearbeiten`,
      input: 'text',
      inputLabel: 'Neuer Preis',
      inputValue: p.price.toString(),
      showCancelButton: true,
      confirmButtonText: 'Updaten'
    });

    if (newPrice) {
      try {
        await fetch(`${API_BASE_URL}/produkte/${p.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            Bezeichnung: p.name, 
            Preis: newPrice,
            Beschreibung: 'Bearbeitet', 
            Bestand: 10, 
            Bildpfad: p.image, 
            Bestseller: p.Bestseller ? 1 : 0 
          })
        });
        Swal.fire('Aktualisiert!', 'Der Preis wurde geändert.', 'success');
        loadProdukte();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteProduct = async (id: number) => {
    const result = await Swal.fire({
      title: 'Wirklich löschen?',
      text: "Das Produkt wird komplett aus der Datenbank entfernt!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ja, löschen!'
    });

    if (result.isConfirmed) {
      try {
        await fetch(`${API_BASE_URL}/produkte/${id}`, { method: 'DELETE' });
        Swal.fire('Gelöscht!', '', 'success');
        loadProdukte();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const ausruestung = dbProdukte.slice(0, 4);
  const technik = dbProdukte.slice(4, 8);
  const zubehoer = dbProdukte.slice(8, 12);
  const weitere = dbProdukte.slice(12);

  const renderProduct = (p: Produkt) => (
    <div key={p.id} style={{ display: 'flex', flexDirection: 'column' }}>
      <Artikel product={p} addToCart={addToCart} />
      {isAdmin && (
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginTop: '10px' }}>
          <button onClick={() => handleEditProduct(p)} style={{ background: '#f39c12', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>✏️ Preis</button>
          <button onClick={() => handleDeleteProduct(p.id)} style={{ background: '#e74c3c', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>🗑️ Löschen</button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <main className='Shop_main'>
        <h1 className="shop-titel">Ocean Dive Shop</h1>
        {isAdmin && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button onClick={handleAddProduct} style={{ background: '#2ecc71', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ➕ Neues Produkt anlegen
            </button>
          </div>
        )}

        {showAddProductModal && (
          <div className="product-modal-overlay" onClick={() => setShowAddProductModal(false)}>
            <div className="product-modal-container" onClick={(e) => e.stopPropagation()}>
              <h2>Neues Produkt anlegen</h2>
              
              <div className="product-form-group">
                <label>Produktname *</label>
                <input 
                  type="text" 
                  placeholder="z.B. Tauch-Anzug"
                  value={newProduct.Bezeichnung}
                  onChange={(e) => setNewProduct({...newProduct, Bezeichnung: e.target.value})}
                />
              </div>

              <div className="product-form-group">
                <label>Beschreibung</label>
                <textarea 
                  placeholder="Produktbeschreibung (optional)"
                  value={newProduct.Beschreibung}
                  onChange={(e) => setNewProduct({...newProduct, Beschreibung: e.target.value})}
                  style={{ resize: 'vertical', minHeight: '80px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="product-form-group">
                  <label>Preis (€) *</label>
                  <input 
                    type="number" 
                    step="0.01"
                    placeholder="49.99"
                    value={newProduct.Preis}
                    onChange={(e) => setNewProduct({...newProduct, Preis: e.target.value})}
                  />
                </div>

                <div className="product-form-group">
                  <label>Bestand *</label>
                  <input 
                    type="number" 
                    placeholder="10"
                    value={newProduct.Bestand}
                    onChange={(e) => setNewProduct({...newProduct, Bestand: e.target.value})}
                  />
                </div>
              </div>

              <div className="product-form-group">
                <label>Bildpfad</label>
                <input 
                  type="text" 
                  placeholder="/placeholder.png"
                  value={newProduct.Bildpfad}
                  onChange={(e) => setNewProduct({...newProduct, Bildpfad: e.target.value})}
                />
              </div>

              <div className="product-form-group product-checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    checked={newProduct.Bestseller}
                    onChange={(e) => setNewProduct({...newProduct, Bestseller: e.target.checked})}
                  />
                  Bestseller markieren
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                <button 
                  onClick={handleSaveProduct}
                  className="product-btn-save"
                >
                  ✅ Speichern
                </button>
                <button 
                  onClick={() => setShowAddProductModal(false)}
                  className="product-btn-cancel"
                >
                  ❌ Abbrechen
                </button>
              </div>
            </div>
          </div>
        )}

        {dbProdukte.length > 0 ? (
          <>
            <section className="kategorie">
              <h2>Ausrüstung</h2>
              <div className="grid">{ausruestung.map(renderProduct)}</div>
            </section>

            <section className="kategorie">
              <h2>Technik</h2>
              <div className="grid">{technik.map(renderProduct)}</div>
            </section>

            <section className="kategorie">
              <h2>Zubehör</h2>
              <div className="grid">{zubehoer.map(renderProduct)}</div>
            </section>

            {weitere.length > 0 && (
              <section className="kategorie">
                <h2>Weitere Artikel</h2>
                <div className="grid">{weitere.map(renderProduct)}</div>
              </section>
            )}
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