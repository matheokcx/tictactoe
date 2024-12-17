import React from 'react'
import '../style.css';

export default function InfosJoueur({ label, nom, timer, couleur, setNom, setCouleur }) {
    return (
        <div>
            <label>{label}: </label>
            <input type="text" value={nom} onChange={(e: any) => setNom(e.target.value)} />
            <p>Chrono {label}: {timer}s</p>
            <input type="color" value={couleur} onChange={(e: any) => setCouleur(e.target.value)} />
        </div>
    );
}