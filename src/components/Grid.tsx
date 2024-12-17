import React from 'react'
import '../style.css';
import Cell from './Cell.tsx';

export default function Grid({ casesGrille, gestionClic, couleursJoueurs }) {
    return (
        <table>
            {[0, 1, 2].map((ligne) => (
                <tr key={ligne}>
                    {[0, 1, 2].map((col) => {
                        const index = ligne * 3 + col;
                        return (
                            <Cell key={index} valeur={casesGrille[index]} action={() => gestionClic(index)} style={{ color: casesGrille[index] === 'X' ? couleursJoueurs[0] : couleursJoueurs[1] }} />
                        );
                    })}
                </tr>
            ))}
        </table>
    );
}