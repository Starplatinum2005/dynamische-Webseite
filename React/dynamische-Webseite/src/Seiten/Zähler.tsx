import './stylesheets/Zähler.css';
import {useState, useEffect} from "react"; //useState (React Hook) um einen State innerhalb der Component abzubilden

const vorherigeSpende = 100;

export const Hochzaehler = () =>{
    const [gesamtSpende, setGesamtSpende] = useState(vorherigeSpende); //gesamtSpende: Spendensumme, die im System gespeichert ist; useState Funktion nimmt einen initialen Zustand und eine Funktion zum Verändern entgegen
    const [anzeigeSpende, setAnzeigeSpende] = useState(0); // anzeigeSpende: aktuelle zahl (auf Bildschirm) (wird hochgezählt zur Summe)

    let betrag = 110; //Simulation einer Spende (solange noch keine Spendenfunktion eingebunden ist)
    
    const Spende =(eingabe:number) =>{
    setGesamtSpende(prev => prev+eingabe); //Funktion erhöht die gesamtSpende (falls gespendet wurde)
}
    
    useEffect (() =>{
        const timer = setInterval(() =>{
            setAnzeigeSpende((prev:number) =>{
                if(prev <gesamtSpende)return prev +1; //solange die gesamtSpende Summe noch nicht erreicht wurde
                clearInterval(timer);
                return prev;
            });
        },10); //alle 10 Millisekunden wird die angezeigte Spende um eins erhöht 
       

return () => clearInterval(timer);
    }, [gesamtSpende, anzeigeSpende]); 


    useEffect (() =>{
        Spende(betrag);//einmalig aufgerufen -> löst Hochzähler aus 
    }, []); // [] -> nur einmal beim ersten Laden 

return (
    <div className = "spendenbox">
       <h2>{anzeigeSpende}€ bereits gespendet</h2> 
    </div>
);
};


