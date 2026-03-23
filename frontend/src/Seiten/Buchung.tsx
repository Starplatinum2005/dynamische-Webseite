import { useEffect, useState } from 'react';
import './stylesheets/buchung.css';
import { Buchungsbox } from '../Komponente/Buchungbox';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './stylesheets/Shop-Modal.css';

const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : '/api';

export function Buchung () {
    const navigate = useNavigate();
    const [dbKurse, setDbKurse] = useState([]);
    const [locations, setLocations] = useState<any[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showAddKursModal, setShowAddKursModal] = useState(false);
    const [showEditKursModal, setShowEditKursModal] = useState(false);
    const [editingKurs, setEditingKurs] = useState<any>(null);
    const [newKurs, setNewKurs] = useState({
        Titel: '',
        Preis: '',
        Teilnehmerobergrenze: '',
        Zeit_der_Veranstaltung: '',
        Location_ID: '1'
    });

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            console.log('User rolle:', user.rolle, 'Type:', typeof user.rolle);
            if (user.rolle === 1 || user.rolle === '1') {
                setIsAdmin(true);
                console.log('Admin erkannt!');
            }
        }
        loadKurse();
        loadLocations();
    }, []);

    const loadKurse = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/kurse`);
            if (response.ok) {
                const data = await response.json();
                setDbKurse(data);
            }
        } catch (err) {
            console.error("Fehler beim Laden der Kurse:", err);
        }
    };

    const loadLocations = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/locations`);
            if (response.ok) {
                const data = await response.json();
                setLocations(data);
                if (data.length > 0 && !newKurs.Location_ID) {
                    setNewKurs(prev => ({...prev, Location_ID: data[0].Location_ID.toString()}));
                }
            }
        } catch (err) {
            console.error("Fehler beim Laden der Locations:", err);
        }
    };

    const handleAddKurs = () => {
        setShowAddKursModal(true);
    };

    const handleSaveKurs = async () => {
        if (!newKurs.Titel.trim() || !newKurs.Preis) {
            Swal.fire('Fehler!', 'Bitte füllen Sie mindestens Titel und Preis aus.', 'error');
            return;
        }

        try {
            await fetch(`${API_BASE_URL}/kurse`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Titel: newKurs.Titel,
                    Preis: parseFloat(newKurs.Preis),
                    Teilnehmerobergrenze: parseInt(newKurs.Teilnehmerobergrenze) || 10,
                    Zeit_der_Veranstaltung: newKurs.Zeit_der_Veranstaltung || new Date().toISOString(),
                    Location_ID: parseInt(newKurs.Location_ID)
                })
            });
            Swal.fire('Angelegt!', 'Der Kurs wurde gespeichert.', 'success');
            setShowAddKursModal(false);
            setNewKurs({
                Titel: '',
                Preis: '',
                Teilnehmerobergrenze: '',
                Zeit_der_Veranstaltung: '',
                Location_ID: locations[0]?.Location_ID?.toString() || '1'
            });
            loadKurse();
        } catch (err) {
            console.error(err);
            Swal.fire('Fehler!', 'Der Kurs konnte nicht gespeichert werden.', 'error');
        }
    };

    const handleEditKurs = (kurs: any) => {
        // Formatiere die Zeit richtig für datetime-local Input
        let formattedDateTime = '';
        if (kurs.Zeit_der_Veranstaltung) {
            try {
                const date = new Date(kurs.Zeit_der_Veranstaltung);
                // Format: YYYY-MM-DDTHH:mm
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
            } catch (e) {
                formattedDateTime = '';
            }
        }

        setEditingKurs({
            Kurs_ID: kurs.Kurs_ID,
            Titel: kurs.Titel,
            Preis: kurs.Preis.toString(),
            Teilnehmerobergrenze: kurs.Teilnehmerobergrenze?.toString() || '10',
            Zeit_der_Veranstaltung: formattedDateTime,
            Location_ID: kurs.Location_ID?.toString() || '1'
        });
        setShowEditKursModal(true);
    };

    const handleUpdateKurs = async () => {
        if (!editingKurs.Titel.trim() || !editingKurs.Preis) {
            Swal.fire('Fehler!', 'Bitte füllen Sie mindestens Titel und Preis aus.', 'error');
            return;
        }

        try {
            await fetch(`${API_BASE_URL}/kurse/${editingKurs.Kurs_ID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Titel: editingKurs.Titel,
                    Preis: parseFloat(editingKurs.Preis),
                    Teilnehmerobergrenze: parseInt(editingKurs.Teilnehmerobergrenze) || 10,
                    Zeit_der_Veranstaltung: editingKurs.Zeit_der_Veranstaltung,
                    Location_ID: parseInt(editingKurs.Location_ID)
                })
            });
            Swal.fire('Aktualisiert!', 'Der Kurs wurde gespeichert.', 'success');
            setShowEditKursModal(false);
            setEditingKurs(null);
            loadKurse();
        } catch (err) {
            console.error(err);
            Swal.fire('Fehler!', 'Der Kurs konnte nicht gespeichert werden.', 'error');
        }
    };

    const handleDeleteKurs = async (id: number) => {
        const result = await Swal.fire({
            title: 'Wirklich löschen?',
            text: "Der Kurs wird komplett aus der Datenbank entfernt!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ja, löschen!',
            cancelButtonText: 'Abbrechen'
        });

        if (result.isConfirmed) {
            try {
                await fetch(`${API_BASE_URL}/kurse/${id}`, { method: 'DELETE' });
                Swal.fire('Gelöscht!', 'Der Kurs wurde entfernt.', 'success');
                loadKurse();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleBezahlen = async (formData: FormData) => {
        if (localStorage.getItem('eingeloggt') === 'true') {
            const anzahlTeilnehmer = parseInt(formData.get('erwachsene') as string) + parseInt(formData.get('kinder') as string);
            const kursId = formData.get('kurs');

            try {
                const response = await fetch(`${API_BASE_URL}/bestellungen`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        User_ID: 2,
                        Kurs_ID: kursId,
                        Anzahl_Teilnehmer: anzahlTeilnehmer,
                        Status: 'In Bearbeitung'
                    })
                });

                if (response.ok) {
                    Swal.fire({
                        title: 'Vielen Dank für Ihre Buchung!',
                        text: 'Die Daten wurden erfolgreich in der Datenbank gespeichert.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    navigate('/');
                } else {
                    throw new Error('Fehler beim Speichern in der Datenbank');
                }
            } catch (error) {
                Swal.fire('Fehler', 'Konnte nicht gebucht werden.', 'error');
                console.error(error);
            }

        } else {
            Swal.fire({
                title: 'Rabattcode verfügbar!',
                text: 'Melde dich an um 10% Rabatt auf diesen Einkauf zu erhalten',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Einloggen',
                cancelButtonText: 'Nein danke'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    navigate('/');
                    Swal.fire({ title: 'Vielen Dank für Ihren Einkauf!', icon: 'success' });
                }
            });
        }
    }

    /*const getLocationName = (locationId: number) => {
        const location = locations.find(l => l.Location_ID === locationId);
        return location ? location.Raumname : `Location ${locationId}`;
    };*/

    return (
        <main className="buchung_main">
            <div className="kurs-container">  
                <div className="kurs-info">
                    <h2>Warnung</h2>
                    <p>Bei dieser Website handelt es sich um ein studentisches Projekt</p>
                </div>
            </div>

            {isAdmin && (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <button 
                        onClick={handleAddKurs}
                        style={{
                            background: '#27ae60',
                            color: 'white',
                            padding: '12px 25px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {e.currentTarget.style.background = '#229954'; e.currentTarget.style.transform = 'translateY(-2px)';}}
                        onMouseOut={(e) => {e.currentTarget.style.background = '#27ae60'; e.currentTarget.style.transform = 'translateY(0)';}}
                    >
                        + Neuer Kurs
                    </button>
                </div>
            )}

            {dbKurse.map((kurs: any) => (
                <div key={kurs.Kurs_ID}>
                    <Buchungsbox dbKurs={kurs} />
                    {isAdmin && (
                        <div style={{ textAlign: 'center', marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button 
                                onClick={() => handleEditKurs(kurs)}
                                style={{
                                    background: '#3498db',
                                    color: 'white',
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => {e.currentTarget.style.background = '#2980b9'; e.currentTarget.style.transform = 'translateY(-2px)';}}
                                onMouseOut={(e) => {e.currentTarget.style.background = '#3498db'; e.currentTarget.style.transform = 'translateY(0)';}}
                            >
                                ✏️ Bearbeiten
                            </button>
                            <button 
                                onClick={() => handleDeleteKurs(kurs.Kurs_ID)}
                                style={{
                                    background: '#e74c3c',
                                    color: 'white',
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => {e.currentTarget.style.background = '#c0392b'; e.currentTarget.style.transform = 'translateY(-2px)';}}
                                onMouseOut={(e) => {e.currentTarget.style.background = '#e74c3c'; e.currentTarget.style.transform = 'translateY(0)';}}
                            >
                                🗑️ Löschen
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {showAddKursModal && (
                <div className="product-modal-overlay" onClick={() => setShowAddKursModal(false)}>
                    <div className="product-modal-container" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={() => setShowAddKursModal(false)}>&times;</span>
                        <h2>Neuer Kurs</h2>
                        
                        <div className="product-form-group">
                            <label>Titel: *</label>
                            <input 
                                type="text"
                                placeholder="z.B. Schnuppertauchen"
                                value={newKurs.Titel}
                                onChange={(e) => setNewKurs({...newKurs, Titel: e.target.value})}
                            />
                        </div>

                        <div className="product-form-group">
                            <label>Preis (€): *</label>
                            <input 
                                type="number"
                                step="0.01"
                                placeholder="z.B. 49.99"
                                value={newKurs.Preis}
                                onChange={(e) => setNewKurs({...newKurs, Preis: e.target.value})}
                            />
                        </div>

                        <div className="product-form-group">
                            <label>Teilnehmerobergrenze:</label>
                            <input 
                                type="number"
                                placeholder="z.B. 10"
                                value={newKurs.Teilnehmerobergrenze}
                                onChange={(e) => setNewKurs({...newKurs, Teilnehmerobergrenze: e.target.value})}
                            />
                        </div>

                        <div className="product-form-group">
                            <label>Datum und Zeit:</label>
                            <input 
                                type="datetime-local"
                                value={newKurs.Zeit_der_Veranstaltung}
                                onChange={(e) => setNewKurs({...newKurs, Zeit_der_Veranstaltung: e.target.value})}
                            />
                        </div>

                        <div className="product-form-group">
                            <label>Standort:</label>
                            <select 
                                value={newKurs.Location_ID}
                                onChange={(e) => setNewKurs({...newKurs, Location_ID: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px'
                                }}
                            >
                                {locations.map(location => (
                                    <option key={location.Location_ID} value={location.Location_ID}>
                                        {location.Raumname}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <button 
                                onClick={handleSaveKurs}
                                style={{
                                    background: '#27ae60',
                                    color: 'white',
                                    padding: '10px 25px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => {e.currentTarget.style.background = '#229954'; e.currentTarget.style.transform = 'translateY(-2px)';}}
                                onMouseOut={(e) => {e.currentTarget.style.background = '#27ae60'; e.currentTarget.style.transform = 'translateY(0)';}}
                            >
                                Speichern
                            </button>
                            <button 
                                onClick={() => setShowAddKursModal(false)}
                                style={{
                                    background: '#95a5a6',
                                    color: 'white',
                                    padding: '10px 25px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => {e.currentTarget.style.background = '#7f8c8d'; e.currentTarget.style.transform = 'translateY(-2px)';}}
                                onMouseOut={(e) => {e.currentTarget.style.background = '#95a5a6'; e.currentTarget.style.transform = 'translateY(0)';}}
                            >
                                Abbrechen
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showEditKursModal && editingKurs && (
                <div className="product-modal-overlay" onClick={() => setShowEditKursModal(false)}>
                    <div className="product-modal-container" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={() => setShowEditKursModal(false)}>&times;</span>
                        <h2>Kurs bearbeiten</h2>
                        
                        <div className="product-form-group">
                            <label>Titel: *</label>
                            <input 
                                type="text"
                                value={editingKurs.Titel}
                                onChange={(e) => setEditingKurs({...editingKurs, Titel: e.target.value})}
                            />
                        </div>

                        <div className="product-form-group">
                            <label>Preis (€): *</label>
                            <input 
                                type="number"
                                step="0.01"
                                value={editingKurs.Preis}
                                onChange={(e) => setEditingKurs({...editingKurs, Preis: e.target.value})}
                            />
                        </div>

                        <div className="product-form-group">
                            <label>Teilnehmerobergrenze:</label>
                            <input 
                                type="number"
                                value={editingKurs.Teilnehmerobergrenze}
                                onChange={(e) => setEditingKurs({...editingKurs, Teilnehmerobergrenze: e.target.value})}
                            />
                        </div>

                        <div className="product-form-group">
                            <label>Datum und Zeit:</label>
                            <input 
                                type="datetime-local"
                                value={editingKurs.Zeit_der_Veranstaltung}
                                onChange={(e) => setEditingKurs({...editingKurs, Zeit_der_Veranstaltung: e.target.value})}
                            />
                        </div>

                        <div className="product-form-group">
                            <label>Standort:</label>
                            <select 
                                value={editingKurs.Location_ID}
                                onChange={(e) => setEditingKurs({...editingKurs, Location_ID: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px'
                                }}
                            >
                                {locations.map(location => (
                                    <option key={location.Location_ID} value={location.Location_ID}>
                                        {location.Raumname}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <button 
                                onClick={handleUpdateKurs}
                                style={{
                                    background: '#27ae60',
                                    color: 'white',
                                    padding: '10px 25px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => {e.currentTarget.style.background = '#229954'; e.currentTarget.style.transform = 'translateY(-2px)';}}
                                onMouseOut={(e) => {e.currentTarget.style.background = '#27ae60'; e.currentTarget.style.transform = 'translateY(0)';}}
                            >
                                Speichern
                            </button>
                            <button 
                                onClick={() => setShowEditKursModal(false)}
                                style={{
                                    background: '#95a5a6',
                                    color: 'white',
                                    padding: '10px 25px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => {e.currentTarget.style.background = '#7f8c8d'; e.currentTarget.style.transform = 'translateY(-2px)';}}
                                onMouseOut={(e) => {e.currentTarget.style.background = '#95a5a6'; e.currentTarget.style.transform = 'translateY(0)';}}
                            >
                                Abbrechen
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <section className="Buchungs-Formular" id="Test">
                <h1 className="Strich">Buchen Sie Ihren Tauchkurs</h1>
                
                <form className="Formular" onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    if (form.checkValidity()) {
                        const formData = new FormData(form);
                        handleBezahlen(formData);
                    } else {
                        form.reportValidity();
                    }
                }}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required placeholder="Max Mustermann" /><br />

                    <label htmlFor="email">E-Mail Adresse:</label>
                    <input type="email" id="email" name="email" required placeholder="max123@gmail.com" /><br />

                    <label htmlFor="erwachsene">Anzahl Erwachsene</label>
                    <input type="number" id="erwachsene" name="erwachsene" defaultValue="1" min="0" required /><br />

                    <label htmlFor="kinder">Anzahl Kinder</label>
                    <input type="number" id="kinder" name="kinder" defaultValue="0" min="0" required /><br />

                    <label htmlFor="kurs">Wählen Sie Ihren Kurs</label>
                    <select id="kurs" name="kurs" required>
                        {dbKurse.map((kurs: any) => (
                            <option key={kurs.Kurs_ID} value={kurs.Kurs_ID}>
                                {kurs.Titel} ({kurs.Preis} €)
                            </option>
                        ))}
                    </select><br/>

                    <label htmlFor="datum">Wunschdatum</label>
                    <input type="date" id="datum" name="datum" required /><br/>

                    <label htmlFor="nachricht">Anmerkungen und Wünsche:</label>
                    <textarea id="nachricht" name="nachricht" placeholder="Ihre Nachricht"></textarea><br/>

                    <button type="submit">Tauchkurs buchen</button>
                </form>
            </section>
        </main>
    )
}

/*
import './stylesheets/buchung.css'
import { BuchungInfo} from '../Objects/Buchung'
import { Buchungsbox } from '../Komponente/Buchungbox'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export function Buchung (){
      const navigate = useNavigate();
      const handleBezahlen = () => {
        if (localStorage.getItem('eingeloggt') === 'true') {
          Swal.fire({
          title: 'Vielen Dank für Ihren Einkauf!',
          icon: 'success',
          confirmButtonText: 'OK'
          });
          navigate('/');
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
            navigate('/');
            Swal.fire({
              title: 'Vielen Dank für Ihren Einkauf!',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            }
          });
        };
      }
    return (
    <>
        <main className="buchung_main">
    
        <div className="kurs-container">  
            <div className="kurs-info">
                <h2>Warnung</h2>
                <p>Bei dieser Website handelt es sich um ein studentisches Projekt</p>
            </div>
        </div>

        <Buchungsbox Kurse={BuchungInfo.Schnuppertauchen} />
        <Buchungsbox Kurse={BuchungInfo.Delfintauchen} />
        <Buchungsbox Kurse={BuchungInfo.Korallentauchen} />
        <Buchungsbox Kurse={BuchungInfo.Tauchschein} />
        <Buchungsbox Kurse={BuchungInfo.Höhlentauchen} />

        <section className="Buchungs-Formular" id="Test">

            <h1 className="Strich">Buchen Sie Ihren Tauchkurs</h1>
                <form className="Formular" onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    if (form.checkValidity()) {
                        handleBezahlen();
                    } else {
                        form.reportValidity();
                    }
                }}>
                <label htmlFor="name">Name:</label>
                <input type="text"  id="name" required placeholder="Max Mustermann" /><br />

                <label htmlFor="email">E-Mail Adresse:</label>
                <input type="email"  id="email" required placeholder="max123@gmail.com" /><br />

                <label htmlFor="number">Anzahl Erwachsene</label>
                <input type="number" id="number" required /><br />

                <label htmlFor="Anzahl">Anzahl Kinder</label>
                <input type="number" id="Anzahl" required /><br />

                <label htmlFor="kurs">Wählen Sie Ihren Kurs</label>
                <select id="kurs" required >
                    <option >Schnuppertauchen (60€ p.P.)</option>
                    <option>Delfintauchen (110€ p.P.)</option>
                    <option>Korallentauchen (80€ p. P.)</option>
                    <option>Tauchschein (300€ p.P.)</option>
                    <option>Höhlentauchen (130€ p.P.)</option>
                </select><br/>

                <label htmlFor="datum">Datum</label>
                <input type="date" id="datum" required /><br/>

                <label htmlFor="nachricht">Anmerkungen und Wünsche:</label>
                <textarea id="nachricht" placeholder="Ihre Nachricht"></textarea><br/>

                <button type="submit">Tauchkurs buchen</button>
            </form>
        </section>
        </main>
    </>
    )
}
*/