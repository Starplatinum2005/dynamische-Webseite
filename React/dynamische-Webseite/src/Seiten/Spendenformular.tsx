import { useState } from 'react';
import {useNavigate} from 'react-router-dom'; //Routing; Hook von react-router-dom um per Knopfdruck die Seite zu wechseln
import './stylesheets/Spendenformular.css';

export const Spendenformularseite = () =>{
    const [betrag, setBetrag] = useState <number| ''>(); //speichert, was der Spender eintippt; betrag darf entweder eine number oder ein leeres String sein 
    const [dankmeldung, setdankMeldung] = useState(''); //für Dank-Meldung nachher 
    const [fehlermeldung, setfehlerMeldung] = useState('');
    const navigate = useNavigate(); //für die Navigation nach der Spende (auf Homepage)

    const check = () =>{

    const zahl = typeof betrag === 'string' ?Number(betrag):betrag; //Ternary-Operator: wenn (leerer) String ,dann NaN

    if(!zahl||zahl<=0){ //Formularvalidierung -> wenn es sich um keine Zahl handelt oder der Betrag unter bzw. gleich null ist dann Fehlermeldung
        setfehlerMeldung(`Bitte gib einen gültigen Betrag ein.`);
        setdankMeldung('');
        return;
    }

    setfehlerMeldung('');
    setdankMeldung(`Vielen Dank für deine Spende von ${zahl}€!`);
   
    
    setTimeout(() =>{
        navigate('/');
    },1500);//wartet 1,5 Sekunden und navigiert dann automatisch auf andere Seite

    };

return(
    <div className = "spendenformular">
        <h1>Spendenformular</h1>
        <p>Hilf mit! Jeder Beitrag zählt.</p>
        <input type = "number" placeholder = "Betrag in €" step = "0.1" value={betrag} onChange={(e) =>//Eingabefeld für die Spende 
          setBetrag(e.target.value=== '' ? '' : Number(e.target.value)) //e=Ereignis-Variable für Event -> onChange = Eingabe-Ereignis ausgelöst wenn ins Feld geschrieben wird
        
        }
        />
            {fehlermeldung &&<p className="fehlermeldung">{fehlermeldung}</p>}
        <button className ="spendenformularbutton" onClick={check}>Jetzt spenden</button>
        {dankmeldung&& <p className="dankmeldung">{dankmeldung}</p>} 
    </div>
);
};


