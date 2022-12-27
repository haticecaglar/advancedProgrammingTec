const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector('.bottom-left-panel');
const bottomRight = document.querySelector('.bottom-right-panel');
const skor_html = document.querySelector('.score');
const gameOverScreen = document.getElementById('game-over-screen');
const restartButton = document.getElementById('restart-button');
let score = 0;

function showGameOver() {
    document.getElementById("game-over-screen").style.display = "block";
  }
  
  function hideGameOver() {
    document.getElementById("game-over-screen").style.display = "none";
  }
function restartGame() {
    // Reset game state here
    hideGameOver();
}

const getRandomPanel = () => {
    const panels = [
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
    ];
    return panels[parseInt(Math.random() * panels.length)];

};

const sequences = [getRandomPanel()];
let sequencesToGuess = [...sequences];

const flash = (panel) => {
    return new Promise(resolve => {
        panel.className += 'active';
        setTimeout(() => {
            panel.className = panel.className.replace('active', '');
            setTimeout(() => {
                resolve();
            }, 250);

        }, 1000)
    });
};
let canClick = false;

const panelClicked = panelClicked => {
    if (!canClick) return;
    const expectedPanel = sequencesToGuess.shift();
    if (expectedPanel === panelClicked) {
        if (sequencesToGuess.length === 0) {
            //Start new round
            sequences.push(getRandomPanel());
            sequencesToGuess = [...sequences];
            score++;
            skor_html.innerHTML = "Skor:".concat(score);
            startFlashing();

        }
    } else {
        //end game
        // alert('game over');
        showGameOver();
        restartButton.addEventListener('click', restartGame);
        
     

    }
    
    
};

const startFlashing = async () => {
    canClick = false;
    for (const panel of sequences) {
        await flash(panel);
    }
    canClick = true;

}