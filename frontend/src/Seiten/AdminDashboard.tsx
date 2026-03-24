import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './stylesheets/AdminDashboard.css';

const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3000/api'
  : '/api';

interface Location {
  Location_ID: number;
  Raumname: string;
  Ort: string;
}

interface Product {
  Artikelnummer: number;
  Bezeichnung: string;
  Beschreibung: string;
  Bestand: number;
  Preis: number;
  Bildpfad: string;
  Bestseller: number;
}

interface Course {
  Kurs_ID: number;
  Titel: string;
  Preis: number;
  Location_ID: number;
  Teilnehmerobergrenze: number;
  Zeit_der_Veranstaltung: string;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'products' | 'courses'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  // Product form state
  const [productForm, setProductForm] = useState({
    Bezeichnung: '',
    Beschreibung: '',
    Bestand: 0,
    Preis: 0,
    Bildpfad: '',
    Bestseller: 0
  });
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  // Course form state
  const [courseForm, setCourseForm] = useState({
    Titel: '',
    Preis: 0,
    Location_ID: 0,
    Teilnehmerobergrenze: 10,
    Zeit_der_Veranstaltung: ''
  });
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);

  // Check admin access
  useEffect(() => {
    const storedUserStr = localStorage.getItem('user');
    console.log('Stored User:', storedUserStr);
    
    if (!storedUserStr) {
      navigate('/login');
      return;
    }

    try {
      const storedUser = JSON.parse(storedUserStr);
      console.log('Parsed User:', storedUser);
      console.log('User Role:', storedUser.rolle);
      
      if (storedUser.rolle !== 1) {
        setIsAdmin(false);
        Swal.fire({
          title: 'Zugriff verweigert',
          text: 'Sie haben keine Berechtigung für diesen Bereich',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/');
        });
      } else {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Fehler beim Parsen des Users:', error);
      navigate('/login');
    }
  }, [navigate]);

  // Load data
  useEffect(() => {
    if (isAdmin === true) {
      loadProducts();
      loadCourses();
      loadLocations();
    }
  }, [isAdmin]);

  const loadProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/produkte`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Produkte:', error);
    }
  };

  const loadCourses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/kurse`);
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Kurse:', error);
    }
  };

  const loadLocations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/locations`);
      if (response.ok) {
        const data = await response.json();
        setLocations(data);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Locations:', error);
    }
  };

  // Product handlers
  const handleProductFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setProductForm({
      ...productForm,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    });
  };

  const handleProductFormCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductForm({
      ...productForm,
      Bestseller: e.target.checked ? 1 : 0
    });
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productForm.Bezeichnung.trim() || productForm.Preis <= 0) {
      Swal.fire({
        title: 'Fehler',
        text: 'Bitte füllen Sie alle erforderlichen Felder aus',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const method = editingProductId ? 'PUT' : 'POST';
      const url = editingProductId
        ? `${API_BASE_URL}/produkte/${editingProductId}`
        : `${API_BASE_URL}/produkte`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm)
      });

      if (response.ok) {
        Swal.fire({
          title: 'Erfolg',
          text: editingProductId ? 'Produkt aktualisiert!' : 'Produkt erstellt!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setProductForm({
          Bezeichnung: '',
          Beschreibung: '',
          Bestand: 0,
          Preis: 0,
          Bildpfad: '',
          Bestseller: 0
        });
        setEditingProductId(null);
        loadProducts();
      } else {
        throw new Error('Fehler beim Speichern');
      }
    } catch (error) {
      console.error('Fehler:', error);
      Swal.fire({
        title: 'Fehler',
        text: 'Fehler beim Speichern des Produkts',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setProductForm(product);
    setEditingProductId(product.Artikelnummer);
    setActiveTab('products');
  };

  const handleDeleteProduct = async (id: number) => {
    const confirm = await Swal.fire({
      title: 'Bestätigung erforderlich',
      text: 'Möchten Sie dieses Produkt wirklich löschen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja, löschen',
      cancelButtonText: 'Abbrechen'
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await fetch(`${API_BASE_URL}/produkte/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        Swal.fire({
          title: 'Erfolg',
          text: 'Produkt gelöscht!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        loadProducts();
      }
    } catch (error) {
      console.error('Fehler:', error);
      Swal.fire({
        title: 'Fehler',
        text: 'Fehler beim Löschen des Produkts',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  // Course handlers
  const handleCourseFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setCourseForm({
      ...courseForm,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    });
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!courseForm.Titel.trim() || courseForm.Preis <= 0 || !courseForm.Location_ID || !courseForm.Zeit_der_Veranstaltung) {
      Swal.fire({
        title: 'Fehler',
        text: 'Bitte füllen Sie alle erforderlichen Felder aus',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const method = editingCourseId ? 'PUT' : 'POST';
      const url = editingCourseId
        ? `${API_BASE_URL}/kurse/${editingCourseId}`
        : `${API_BASE_URL}/kurse`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseForm)
      });

      if (response.ok) {
        Swal.fire({
          title: 'Erfolg',
          text: editingCourseId ? 'Kurs aktualisiert!' : 'Kurs erstellt!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setCourseForm({
          Titel: '',
          Preis: 0,
          Location_ID: 0,
          Teilnehmerobergrenze: 10,
          Zeit_der_Veranstaltung: ''
        });
        setEditingCourseId(null);
        loadCourses();
      } else {
        throw new Error('Fehler beim Speichern');
      }
    } catch (error) {
      console.error('Fehler:', error);
      Swal.fire({
        title: 'Fehler',
        text: 'Fehler beim Speichern des Kurses',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleEditCourse = (course: Course) => {
    setCourseForm(course);
    setEditingCourseId(course.Kurs_ID);
    setActiveTab('courses');
  };

  const handleDeleteCourse = async (id: number) => {
    const confirm = await Swal.fire({
      title: 'Bestätigung erforderlich',
      text: 'Möchten Sie diesen Kurs wirklich löschen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja, löschen',
      cancelButtonText: 'Abbrechen'
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await fetch(`${API_BASE_URL}/kurse/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        Swal.fire({
          title: 'Erfolg',
          text: 'Kurs gelöscht!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        loadCourses();
      }
    } catch (error) {
      console.error('Fehler:', error);
      Swal.fire({
        title: 'Fehler',
        text: 'Fehler beim Löschen des Kurses',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  // Early return if not admin (redirect handled by useEffect)
  if (isAdmin !== true) {
    return null;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <h1>Admin Dashboard</h1>
        <p className="admin-subtitle">Verwalten Sie Produkte und Kurse</p>

        <div className="admin-tabs">
          <button className={`tab-button ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            📦 Produkte
          </button>
          <button className={`tab-button ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => setActiveTab('courses')}>
            📚 Kurse
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="admin-section">
            <h2>Produkte verwalten</h2>
            <div className="admin-form-container">
              <h3>{editingProductId ? 'Produkt bearbeiten' : 'Neues Produkt erstellen'}</h3>
              <form onSubmit={handleAddProduct} className="admin-form">
                <div className="form-group">
                  <label>Produktname *</label>
                  <input type="text" name="Bezeichnung" value={productForm.Bezeichnung} onChange={handleProductFormChange} required placeholder="z.B. Tauchermaske" />
                </div>
                <div className="form-group">
                  <label>Beschreibung</label>
                  <textarea name="Beschreibung" value={productForm.Beschreibung} onChange={handleProductFormChange} placeholder="Produktbeschreibung eingeben..." rows={3} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Bestand *</label>
                    <input type="number" name="Bestand" value={productForm.Bestand} onChange={handleProductFormChange} min="0" required />
                  </div>
                  <div className="form-group">
                    <label>Preis (€) *</label>
                    <input type="number" name="Preis" value={productForm.Preis} onChange={handleProductFormChange} min="0" step="0.01" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Bildpfad</label>
                  <input type="text" name="Bildpfad" value={productForm.Bildpfad} onChange={handleProductFormChange} placeholder="z.B. /tauchmaske.png" />
                </div>
                <div className="form-group checkbox">
                  <input type="checkbox" name="Bestseller" checked={productForm.Bestseller === 1} onChange={handleProductFormCheckbox} id="bestseller" />
                  <label htmlFor="bestseller">Als Bestseller markieren</label>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary">{editingProductId ? 'Produkt aktualisieren' : 'Produkt erstellen'}</button>
                  {editingProductId && (
                    <button type="button" className="btn-secondary" onClick={() => {
                      setProductForm({ Bezeichnung: '', Beschreibung: '', Bestand: 0, Preis: 0, Bildpfad: '', Bestseller: 0 });
                      setEditingProductId(null);
                    }}>Abbrechen</button>
                  )}
                </div>
              </form>
            </div>

            <div className="admin-list-container">
              <h3>Bestehende Produkte ({products.length})</h3>
              {products.length > 0 ? (
                <div className="admin-list">
                  {products.map((product) => (
                    <div key={product.Artikelnummer} className="admin-item">
                      <div className="item-header">
                        <h4>{product.Bezeichnung}</h4>
                        <span className="item-id">ID: {product.Artikelnummer}</span>
                      </div>
                      <div className="item-details">
                        <p><strong>Beschreibung:</strong> {product.Beschreibung || 'Keine'}</p>
                        <p><strong>Bestand:</strong> {product.Bestand} Stück</p>
                        <p><strong>Preis:</strong> €{Number(product.Preis).toFixed(2)}</p>
                        <p><strong>Bildpfad:</strong> {product.Bildpfad}</p>
                        <p><strong>Bestseller:</strong> {product.Bestseller ? 'Ja ⭐' : 'Nein'}</p>
                      </div>
                      <div className="item-actions">
                        <button className="btn-edit" onClick={() => handleEditProduct(product)}>✏️ Bearbeiten</button>
                        <button className="btn-delete" onClick={() => handleDeleteProduct(product.Artikelnummer)}>🗑️ Löschen</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-message">Keine Produkte vorhanden</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="admin-section">
            <h2>Kurse verwalten</h2>
            <div className="admin-form-container">
              <h3>{editingCourseId ? 'Kurs bearbeiten' : 'Neuen Kurs erstellen'}</h3>
              <form onSubmit={handleAddCourse} className="admin-form">
                <div className="form-group">
                  <label>Kurstitel *</label>
                  <input type="text" name="Titel" value={courseForm.Titel} onChange={handleCourseFormChange} required placeholder="z.B. Open Water Diver Anfängerkurs" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Preis (€) *</label>
                    <input type="number" name="Preis" value={courseForm.Preis} onChange={handleCourseFormChange} min="0" step="0.01" required />
                  </div>
                  <div className="form-group">
                    <label>Teilnehmerobergrenze *</label>
                    <input type="number" name="Teilnehmerobergrenze" value={courseForm.Teilnehmerobergrenze} onChange={handleCourseFormChange} min="1" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Location *</label>
                  <select name="Location_ID" value={courseForm.Location_ID} onChange={handleCourseFormChange} required>
                    <option value="0">-- Location auswählen --</option>
                    {locations.map((location) => (
                      <option key={location.Location_ID} value={location.Location_ID}>{location.Raumname} ({location.Ort})</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Datum & Uhrzeit *</label>
                  <input type="datetime-local" name="Zeit_der_Veranstaltung" value={courseForm.Zeit_der_Veranstaltung} onChange={handleCourseFormChange} required />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary">{editingCourseId ? 'Kurs aktualisieren' : 'Kurs erstellen'}</button>
                  {editingCourseId && (
                    <button type="button" className="btn-secondary" onClick={() => {
                      setCourseForm({ Titel: '', Preis: 0, Location_ID: 0, Teilnehmerobergrenze: 10, Zeit_der_Veranstaltung: '' });
                      setEditingCourseId(null);
                    }}>Abbrechen</button>
                  )}
                </div>
              </form>
            </div>

            <div className="admin-list-container">
              <h3>Bestehende Kurse ({courses.length})</h3>
              {courses.length > 0 ? (
                <div className="admin-list">
                  {courses.map((course) => {
                    const location = locations.find(l => l.Location_ID === course.Location_ID);
                    const dateTime = new Date(course.Zeit_der_Veranstaltung).toLocaleString('de-DE');
                    return (
                      <div key={course.Kurs_ID} className="admin-item">
                        <div className="item-header">
                          <h4>{course.Titel}</h4>
                          <span className="item-id">ID: {course.Kurs_ID}</span>
                        </div>
                        <div className="item-details">
                          <p><strong>Preis:</strong> €{Number(course.Preis).toFixed(2)}</p>
                          <p><strong>Teilnehmerobergrenze:</strong> {course.Teilnehmerobergrenze} Personen</p>
                          <p><strong>Location:</strong> {location ? location.Raumname : 'Unbekannt'} ({location?.Ort})</p>
                          <p><strong>Datum & Zeit:</strong> {dateTime}</p>
                        </div>
                        <div className="item-actions">
                          <button className="btn-edit" onClick={() => handleEditCourse(course)}>✏️ Bearbeiten</button>
                          <button className="btn-delete" onClick={() => handleDeleteCourse(course.Kurs_ID)}>🗑️ Löschen</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="empty-message">Keine Kurse vorhanden</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
