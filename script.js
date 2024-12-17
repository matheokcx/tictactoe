const min = Math.ceil(1);
const max = Math.floor(100);
let tour = Math.floor(Math.random() * (max - min) + min) % 2 == 0 ? 1 : 2;
let casesGrilles = [];
const casVictoire = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7],
];

let timerJoueur1 = 0;
let timerJoueur2 = 0;
let intervalJ1 = null;
let intervalJ2 = null;
let couleurJ1 = document.getElementById('couleurJ1').value;
let couleurJ2 = document.getElementById('couleurJ2').value;
let currentPlayer = document.getElementById('currentPlayer');
let scores = new Map();


function initialiserGrille() {
    for (let i = 1; i <= 9; i++) {
        const nom = 'c' + i;
        casesGrilles[i] = document.getElementById(nom);
        casesGrilles[i].innerHTML = "";
        timerJoueur1 = 0;
        timerJoueur2 = 0;
        document.getElementById('tempsJ1').textContent = '';
        document.getElementById('tempsJ2').textContent = '';

        let btn = document.createElement("button");
        btn.textContent = "choisir";
        btn.addEventListener('click', () => {
            casesGrilles[i].removeChild(btn);
            const texte = document.createElement("p");
            if (tour % 2 == 0) {
                texte.textContent = "X";
                texte.style.color = couleurJ1;
                currentPlayer.textContent = `A ${document.getElementById('nomJoueur2').value} de jouer !`;
                startTimerJoueur2();
            }
            else {
                texte.textContent = "O";
                texte.style.color = couleurJ2;
                currentPlayer.textContent = `A ${document.getElementById('nomJoueur1').value} de jouer !`;
                startTimerJoueur1();
            }
            casesGrilles[i].appendChild(texte);
            verifierVictoire();
            tour++;
        })
        casesGrilles[i].appendChild(btn);
    }
}

initialiserGrille()

function verifierVictoire() {
    for (const cas of casVictoire) {
        const [a, b, c] = cas;

        const texteA = casesGrilles[a].querySelector("p")?.textContent;
        const texteB = casesGrilles[b].querySelector("p")?.textContent;
        const texteC = casesGrilles[c].querySelector("p")?.textContent;
        let classement = document.getElementById('classement');

        if (texteA && texteA === texteB && texteB === texteC) {
            let nomJoueur1 = document.getElementById('nomJoueur1').value;
            let nomJoueur2 = document.getElementById('nomJoueur2').value;
            classement.innerHTML = '';
            if (texteA === 'X') {
                alert(`Le joueur ${nomJoueur1} a gagné en ${timerJoueur1}s !`);
                scores.get(nomJoueur1) == null || timerJoueur1 < scores.get(nomJoueur1) ? scores.set(nomJoueur1, timerJoueur1) : null;
                scores = new Map([...scores.entries()].sort((a, b) => a[1] - b[1]));
                scores.forEach((score, joueur) => {
                    let e = document.createElement("p");
                    e.textContent = `${joueur} => ${score}s`;
                    classement.appendChild(e);
                });
            }
            else {
                alert(`Le joueur ${nomJoueur2} a gagné en ${timerJoueur2}s !`);
                scores.get(nomJoueur2) == null || timerJoueur2 < scores.get(nomJoueur2) ? scores.set(nomJoueur2, timerJoueur2) : null;
                scores = new Map([...scores.entries()].sort((a, b) => a[1] - b[1]));
                scores.forEach((score, joueur) => {
                    let e = document.createElement("p");
                    e.textContent = `${joueur} => ${score}s`;
                    classement.appendChild(e);
                });
            }
            clearInterval(intervalJ1);
            clearInterval(intervalJ2);
            initialiserGrille();
            tour = Math.floor(Math.random() * (max - min) + min) % 2 == 0 ? 1 : 2;
            return;
        }
    }
    if (tour == 9) {
        alert("Match nul !");
        initialiserGrille();
    }
}

function startTimerJoueur1() {
    if (intervalJ2) clearInterval(intervalJ2);
    intervalJ1 = setInterval(() => {
        timerJoueur1++;
        couleurJ1 = document.getElementById('couleurJ1').value;
        document.getElementById('tempsJ1').textContent = `Chrono J1: ${timerJoueur1}s`;
    }, 1000);
}

function startTimerJoueur2() {
    if (intervalJ1) clearInterval(intervalJ1);
    intervalJ2 = setInterval(() => {
        timerJoueur2++;
        couleurJ2 = document.getElementById('couleurJ2').value;
        document.getElementById('tempsJ2').textContent = `Chrono J2: ${timerJoueur2}s`;
    }, 1000);
}