const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector('.bottom-left-panel');
const bottomRight = document.querySelector('.bottom-right-panel');
const skor_html = document.querySelector('.score');
const gameOverScreen = document.getElementById('game-over-screen');
const restartButton = document.getElementById('restart-button');
const hearts = document.getElementById("hearts");
let score = 0;
let live = 3;
let heart_id=3;
function showGameOver() {
    document.getElementById("game-over-screen").style.display = "block";
    restartButton.addEventListener('click', restartGame);
}
  
function hideGameOver() {
    document.getElementById("game-over-screen").style.display = "none";
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

let sequences = [getRandomPanel()];
let sequencesToGuess = [...sequences];
function restartGame() {
    // Reset game state here
    hideGameOver();
    document.getElementById('1').style.visibility="visible";
    document.getElementById('2').style.visibility="visible";
    document.getElementById('3').style.visibility="visible";
    score=0;
    sequences=[];
    live=3;
    sequencesToGuess = [...sequences];
    skor_html.innerHTML = "Skor:".concat(score);
    sequences = [getRandomPanel()];
    sequencesToGuess = [...sequences];

}

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
    } else{
        var child = document.getElementById(live); 
        child.style.visibility="hidden";
        live--;      
        if(live>0){
            sequences.push(getRandomPanel());
            sequencesToGuess = [...sequences];
            startFlashing();
        }else{
            showGameOver();
        }
     
        //showGameOver();
        
    }
    
    
};

const startFlashing = async () => {
    canClick = false;
    for (const panel of sequences) {
        await flash(panel);
    }
    canClick = true;

}