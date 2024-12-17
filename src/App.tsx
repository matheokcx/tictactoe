import React from 'react';
import './style.css';
import Grid from './components/Grid.tsx';
import { useState, useEffect, useRef } from 'react'
import InfosJoueur from './components/InfosJoueur.tsx';

export default function App() {
  const [tour, setTour] = useState<number>(Math.random() > 0.5 ? 1 : 2);
  const [casesGrille, setCasesGrille] = useState(Array(9).fill(null));
  const [couleurJ1, setCouleurJ1] = useState<string>('#000000');
  const [couleurJ2, setCouleurJ2] = useState<string>('#000000');
  const [nomJoueur1, setNomJoueur1] = useState<string>('Joueur 1');
  const [nomJoueur2, setNomJoueur2] = useState<string>('Joueur 2');
  const [scores, setScores] = useState(new Map());
  const [timerJoueur1, setTimerJoueur1] = useState<number>(0);
  const [timerJoueur2, setTimerJoueur2] = useState<number>(0);
  const intervalJ1 = useRef<number | null>(null);
  const intervalJ2 = useRef<number | null>(null);

  const casVictoire: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  useEffect(() => {
    return () => {
      if (intervalJ1.current) clearInterval(intervalJ1.current);
      if (intervalJ2.current) clearInterval(intervalJ2.current);
    };
  }, [intervalJ1, intervalJ2]);

  const initialiserGrille = () => {
    setCasesGrille(Array(9).fill(null));
    setTimerJoueur1(0);
    setTimerJoueur2(0);
    setTour(Math.random() > 0.5 ? 1 : 2);
  };

  const startTimerJoueur1 = () => {
    if (intervalJ2.current) clearInterval(intervalJ2.current);
    intervalJ1.current = setInterval(() => {
      setTimerJoueur1((timer) => timer + 1);
    }, 1000);
  };

  const startTimerJoueur2 = () => {
    if (intervalJ1.current) clearInterval(intervalJ1.current);
    intervalJ2.current = setInterval(() => {
      setTimerJoueur2((timer) => timer + 1);
    }, 1000);
  };

  const verifierVictoire = () => {
    for (const cas of casVictoire) {
      const [a, b, c] = cas;
      if (casesGrille[a] && casesGrille[a] === casesGrille[b] && casesGrille[b] === casesGrille[c]) {
        const gagnant = casesGrille[a] === 'X' ? nomJoueur1 : nomJoueur2;
        const temps = casesGrille[a] === 'X' ? timerJoueur1 : timerJoueur2;
        alert(`Le joueur ${gagnant} a gagné en ${temps}s !`);

        setScores((anciensScores) => {
          const newScores = new Map<any, any>(anciensScores);
          if (!newScores.has(gagnant)) {
            newScores.set(gagnant, [temps, 1]);
          }
          else {
            const [meilleurTemps, nbVictoires] = newScores.get(gagnant);

            if (temps < meilleurTemps) {
              newScores.set(gagnant, [temps, nbVictoires + 1]);
            }
            else {
              newScores.set(gagnant, [meilleurTemps, nbVictoires + 1]);
            }
          }
          return new Map([...newScores.entries()].sort((a, b) => a[1] - b[1]));
        });

        clearInterval(intervalJ1.current);
        clearInterval(intervalJ2.current);
        initialiserGrille();
        return;
      }
    }

    if (casesGrille.every((cell) => cell)) {
      alert("Match nul !");
      clearInterval(intervalJ1.current);
      clearInterval(intervalJ2.current);
      initialiserGrille();
    }
  };

  const gestionClique = (index) => {
    if (casesGrille[index]) return;

    const newGrilles = [...casesGrille];
    newGrilles[index] = tour % 2 === 0 ? 'X' : 'O';
    setCasesGrille(newGrilles);
    if (tour % 2 === 0) {
      startTimerJoueur2();
    }
    else {
      startTimerJoueur1();
    }
    setTour(tour + 1);
  };

  useEffect(() => {
    verifierVictoire();
  }, [casesGrille]);

  return (
    <div className="box">
      <Grid casesGrille={casesGrille} gestionClic={gestionClique} couleursJoueurs={[couleurJ1, couleurJ2]} />
      <aside className="conteneur">
        <h1><u>TicTacToe</u></h1>
        <InfosJoueur label="X" nom={nomJoueur1} timer={timerJoueur1} couleur={couleurJ1} setNom={setNomJoueur1} setCouleur={setCouleurJ1} />
        <InfosJoueur label="O" nom={nomJoueur2} timer={timerJoueur2} couleur={couleurJ2} setNom={setNomJoueur2} setCouleur={setCouleurJ2} />
        <div className="leaderboard">
          <h2><u>Classement (nom, meilleur temps, victoires): </u></h2>
          {[...scores.entries()].map(([nom, scores]) => (
            <p key={nom}>{`${nom} => ${scores[0]}s | ${scores[1]} victoires`}</p>
          ))}
        </div>
      </aside>
    </div>
  );
}