import './stylesheets/Zähler.css';
import {useState, useEffect} from 'react'; //useState (React Hook) um einen State innerhalb der Component abzubilden
import { useNavigate} from 'react-router-dom'; //mit Routing zwischen einzelnen Bereichen navigieren

const vorherigeSpende = 1000;


export const Hochzaehler = () =>{
    const navigate = useNavigate();
    const [gesamtSpende, setGesamtSpende] = useState(vorherigeSpende); //gesamtSpende: Spendensumme, die im System gespeichert ist; useState Funktion nimmt einen initialen Zustand und eine Funktion zum Verändern entgegen
    const [anzeigeSpende, setAnzeigeSpende] = useState(0); // anzeigeSpende: aktuelle zahl (auf Bildschirm) (wird hochgezählt zur Summe)

    const betrag = 110; //Simulation einer Spende (solange noch keine Spendenfunktion eingebunden ist)
    
    const Spende =(eingabe:number) =>{
      setGesamtSpende(prev => prev+eingabe); //Funktion erhöht die gesamtSpende (falls gespendet wurde)
    };
    
/*useEffect(() => {
    let timer;

    const updateSpeed = () => {
      const differenz = gesamtSpende - anzeigeSpende;

      let delay;
      if (differenz>20) {
        delay = 20; //sehr schnelles Zählen
      } else if (differenz <= 20&& differenz>5) {
        delay = 80;
      } else if(differenz <=5) {
        delay = 200;
      }

      timer = setTimeout(() => {
        setAnzeigeSpende(prev => {
          if (prev < gesamtSpende) {
            updateSpeed();
            return prev + 1;
          }
          return prev;
        });
      }, delay);
    };

    if (anzeigeSpende < gesamtSpende) {
      updateSpeed();
    }

    return () => clearTimeout(timer);
  }, [gesamtSpende, anzeigeSpende]); */


  useEffect (() =>{
    const timer = setInterval(() =>{
      setAnzeigeSpende((prev:number) =>{
        if(prev <gesamtSpende)return prev +1; //solange die gesamtSpende Summe noch nicht erreicht wurde
          clearInterval(timer);
            return prev;
      });
    },1); //jede Millisekunden wird die angezeigte Spende um eins erhöht    
    return () => clearInterval(timer);
  }, [gesamtSpende, anzeigeSpende]); 

  useEffect (() =>{
    Spende(betrag);//einmalig aufgerufen -> löst Hochzähler aus 
  }, []); // [] -> nur einmal beim ersten Laden 

  return (
    <div className = "spendenbox">
       <h2>{anzeigeSpende}€ bereits gespendet</h2> 
       <p className = "spendenhinweis">Du willst auch helfen? </p>
       <button className = "spendenbutton" onClick = {() => navigate('/Spendenseite')}>
        Jetzt spenden
        </button>
    </div>
  );
};


