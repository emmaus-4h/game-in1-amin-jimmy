const statusText = document.querySelector('.boterkaaseierenstatus');


// Boolean als de game bezig is. 
let gameActief = true;
// Welke speler begint (Ik heb X gedaan.)
let momenteleSpeler = "X";
let spelStatus = ["", "", "", "", "", "", "", "", ""];
// Wanneer een speler wint vertoont het dit bericht
const winningMessage = () => `Speler ${momenteleSpeler} heeft gewonnen!`;
// Wanneer een speler gelijkspel speelt vertoont het dit bericht
const gelijkspelBericht = () => `Gelijkspel`;

// Wie aan de beurt is.
const momenteleSpelerBeurt = () => `Speler  ${momenteleSpeler} beurt`;


// Verandert de HTML tekst naar de const momenteleSpelerBeurt
statusText.innerHTML = momenteleSpelerBeurt();

// Wanneer een speler kan winnen 

const winKansen = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Kijkt wanneer iemand een vakje klikt
function vakjesHandelaar(geklikteVak, geklikteVakIndex) {
    spelStatus[geklikteVakIndex] = momenteleSpeler;
    geklikteVak.innerHTML = momenteleSpeler;
}

// Verandert de X naar een O als X heeft geklikt.
function handelaarSpelerVeranderen() {
    momenteleSpeler = momenteleSpeler === "X" ? "O" : "X";
    statusText.innerHTML = momenteleSpelerBeurt();
}

// Kijken als iemand gewonnen heeft.
function resultaatChecker() {
    let rondeGewonnen = false;
    for (let i = 0; i <= 7; i++) {
        const winKans = winKansen[i];
        let a = spelStatus[winKans[0]];
        let b = spelStatus[winKans[1]];
        let c = spelStatus[winKans[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            rondeGewonnen = true;
            break
        }
    }
// Als de speler heeft gewonnen verandert hij de HTML text.
    if (rondeGewonnen) {
        statusText.innerHTML = winningMessage();
        gameActief = false;
        return;
    }
// Als het gelijkspel is verandert het de HTML text.
    let rondeGelijkspel = !spelStatus.includes("");
    if (rondeGelijkspel) {
        statusText.innerHTML = gelijkspelBericht();
        gameActief = false;
        return;
    }

    handelaarSpelerVeranderen();
}


function handelaarVakjesKlik(geklikteVakEvent) {
    const geklikteVak = geklikteVakEvent.target;
    const geklikteVakIndex = parseInt(geklikteVak.getAttribute('data-cell-index'));

    if (spelStatus[geklikteVakIndex] !== "" || !gameActief) {
        return;
    }

    vakjesHandelaar(geklikteVak, geklikteVakIndex);
    resultaatChecker();
}
// Als iemand op Herstarten klikt.
function handelaarSpelHerstarten() {
    gameActief = true;
    momenteleSpeler = "X";
    spelStatus = ["", "", "", "", "", "", "", "", ""];
    statusText.innerHTML = momenteleSpelerBeurt();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.vak').forEach(cell => cell.addEventListener('click', handelaarVakjesKlik));
document.querySelector('.herstart').addEventListener('click', handelaarSpelHerstarten);