import './stylesheets/Naturschutzgebiet.css';
import {Hochzaehler} from './Zähler';

export function Naturschutz (){
    return(
    <>
    <main className='main_Naturschutzgebiet'>
        <h1 className='h1_Naturschutzgebiet'> Naturschutzgebiet "Korallenreich" – Ein Projekt der Tauchschule Blue Ocean Dive</h1>

        <section className="Naturschutzgebiet-container">
            <img className="Naturschutzgebiet-image" src="https://cdn.pixabay.com/photo/2023/10/30/13/49/ai-generated-8352912_640.jpg" alt="Korallenriff"/>
            <article className="Naturschutzgebiet-text">
                <p>Mitten im Herzen eines faszinierenden Unterwasserparadieses liegt das Naturschutzgebiet "Korallenreich", ein einzigartiges Projekt, das von der Tauchschule Blue Ocean Dive ins Leben gerufen wurde. Dieses beeindruckende Areal ist nicht nur ein Rückzugsort für bedrohte Meereslebewesen, sondern auch ein lebendiges Beispiel für die Kraft gemeinsamer Bemühungen, unsere Ozeane zu schützen.</p>
                <h2>Die Vision hinter dem Projekt</h2>
                <p>Die Idee für das Naturschutzgebiet entstand aus der Beobachtung des stetigen Rückgangs von Korallenriffen und ihrer Bewohner. Als engagierte Taucher und Umweltschützer entschied sich das Team der Tauchschule, aktiv zu werden. Ziel des Projekts ist es, einen sicheren Lebensraum für marine Arten zu schaffen, das Bewusstsein für den Schutz der Ozeane zu stärken und die lokale Gemeinschaft in nachhaltige Praktiken einzubinden.</p>
            </article>
        </section>
    

    
        <section className="Müllsammeln">
            <img className="Müllsammeln-image" src="https://cdn.pixabay.com/photo/2023/02/14/04/39/volunteer-7788809_960_720.jpg" alt="Mann sammelt den Müll in einen Sack"/>
            <article className = "Müllsammeln-text">
                <h2>Maßnahmen zur Erhaltung des Ökosystems</h2> 
                <p>Das Projekt kombiniert praktische Schutzmaßnahmen mit wissenschaftlicher Forschung und Aufklärung: </p>
                    
                <h3>Korallenaufforstung:</h3>
                <p>Durch das Züchten von Korallenfragmenten in speziellen Unterwasser-Plantagen wird das Riff schrittweise regeneriert.</p>
            
                <h3>Säuberungsaktionen:</h3> 
                <p>Regelmäßige Tauchgänge zur Müllentfernung verhindern, dass Abfälle das sensible Ökosystem zerstören.</p>
                <h3>Überwachungsprogramme:</h3>   
                <p>Mit Unterstützung von Meeresbiologen werden Populationen von Fischen, Schildkröten und anderen Arten überwacht, um die biologische Vielfalt zu erhalten.</p>
            </article> 
        </section>

        <br/>
        <br/>
        <br/>
    
        <section className="Taucher">
            <img className="Taucher-image" src="https://cdn.pixabay.com/photo/2024/10/18/06/56/scuba-diving-9129600_1280.jpg" alt="Zwei Taucher, die im Wasser tauchen"/>
            <article className = "Taucher-text">
                    <h2>  Taucher als Botschafter des Meeres </h2>  
                    <p>Einen besonderen Beitrag leisten die Taucher selbst. Besucher und Kursteilnehmer der Tauchschule haben die Möglichkeit, an Workshops und speziellen Tauchgängen teilzunehmen, die sich auf Naturschutz konzentrieren. Dabei lernen sie nicht nur die Schönheit der Unterwasserwelt kennen, sondern auch, wie wichtig ihr Schutz ist. Diese "Unterwasserbotschafter" tragen die Botschaft des Projekts in die Welt hinaus. </p>
                    <h2>  Partnerschaften und Gemeinschaftsarbeit</h2>      
                    <p> Das Projekt wäre ohne die Unterstützung der lokalen Gemeinschaft und internationaler Partner nicht möglich. Fischer, Schulen, NGOs und Wissenschaftler arbeiten gemeinsam mit der Tauchschule, um langfristige Lösungen zu entwickeln. Besonders stolz ist das Team auf die Zusammenarbeit mit Kindern und Jugendlichen, die durch Bildungsprogramme zu einer Generation heranwachsen, die die Ozeane respektiert und schützt. </p>
            </article> 
        </section>
       
        <br/>
    
        <section>
            <h2>  Ein nachhaltiges Modell für die Zukunft </h2>     
            <p>Das Naturschutzgebiet "Korallenreich" ist nicht nur ein Zufluchtsort für die Meeresbewohner, sondern auch ein Vorbild für andere Initiativen weltweit. Die Tauchschule Blue Ocean Dive zeigt, dass Naturschutz und Tourismus Hand in Hand gehen können. Mit jedem geretteten Korallenstück und jedem geschulten Taucher  wird ein Stück Hoffnung für unsere Ozeane bewahrt.</p>
            <br/>
            <p>Die Tauchschule lädt alle Interessierten ein, Teil dieses besonderen Projekts zu werden – ob durch eine Spende, aktive Mitarbeit oder einen Besuch des Naturschutzgebiets. Gemeinsam können wir die Unterwasserwelt schützen und für zukünftige Generationen bewahren.</p>
        </section>
        <Hochzaehler />
    </main>
    </>
);
}