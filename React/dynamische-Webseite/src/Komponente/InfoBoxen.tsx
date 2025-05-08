import './InfoBoxen.css'
import { InfoBox } from '../Objects/Angebote'

export function InfoBoxen ({ info }: { info: InfoBox }){
    return (
        <>
            <article className="box">
                <h2>{info.h2}</h2>
                <p>{info.p}</p>
            </article>
        </>
    )
}