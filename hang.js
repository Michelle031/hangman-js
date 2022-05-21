const words = [["moth", "almost same as a butterfly"], ['duck', 'quack quack'], ['dolphin', 'intelligent sea animal'],
["joey", "baby of a kangaroo"], ["dog", "common domestic animal"], ["crocodile", "water devil"], ["camel", "desert animal"],
["leopard", "from the cat family"], ["hyena", "member of the dog family"], ["rabbit", "cute mammal"],
["chameleon", "camouflage animal"], ["kitten", "baby of the cat family"], ["phoenix", "mythical creature"],
["squirrel", "furry tail"], ['tortoise', "pretty slow"], ["warthog", "pumba"], ["chimpanzee", "monkey family"],
["panther", "black cat"], ["chipmunk", "alvin"], ["patrigde", "christmas song"], ["horse", "rider"], ["dragon", "fire"],
["ladybug", "superhero fly"], ["bat", "blind"], ["cricket", "evening noisemaker"], ["skunk", "bad fart"]];


var buttons = document.getElementsByClassName('bu');
var reset_ = document.getElementById('reset').addEventListener('click', reset);
var guessed= [];
var mistakes = 0;
var answer = '';
var word_play = null;
const maxFail = 6;
const spotLight = document.getElementById("input");
const hint = document.getElementById('clue');
var errors = document.getElementById("mistakes");

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
      `
        <button
          class="btn btn-lg btn-primary m-2"
          id='` + letter + `'
          onClick="guess('` + letter + `')"
        >
          ` + letter + `
        </button>
      `).join('');
  
    document.getElementById('buttons').innerHTML = buttonsHTML;
  }
generateButtons();

function generateWord() {
    var choice = Math.floor(Math.random()*words.length)
    answer = words[choice][0];
    console.log(answer);
    hint_= words[choice][1];
    hint.innerHTML = hint_;
}
generateWord();

function guess(cletter){
    guessed.indexOf(cletter) === -1 ? guessed.push(cletter) : null;
    document.getElementById(cletter).setAttribute("disabled", true);

    if (answer.indexOf(cletter) >= 0) {
        guessWord();
        checkWin();
    } else if (answer.indexOf(cletter) === -1) {
        mistakes++;
        addMistakes();
        checkLoss();
        updateHm();
        
    }
}



function guessWord() {
    word_play = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter  : "_")).join(' ');
    spotLight.innerText = word_play;
}


function checkWin() {
    if (word_play.indexOf("_") === -1) {
        document.getElementById('status').innerText = "You Won!!"
        document.getElementById('status').classList.add("win");
        document.getElementById('buttons').style.display = "none";
    }
}

function checkLoss() {
    if (mistakes === maxFail) {
        spotLight.innerHTML = "The answer was : " + answer;
        document.getElementById('status').innerHTML = "You Lost!!"
        document.getElementById('status').classList.add("lose");
        document.getElementById('buttons').style.display = "none";
    }
}

function addMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

function reset(){
    mistakes = 0;
    guessed= [];
    generateWord();
    guessWord();
    addMistakes();
    generateButtons();
    document.getElementById('buttons').style.removeProperty('display') ;
    document.getElementById("hmpic").src = "./images/0.jpg";
    document.getElementById('status').classList.remove("lose");
    document.getElementById('status').classList.remove("win");
}
function updateHm() {
    document.getElementById("hmpic").src = "./images/" + mistakes + ".jpg";
}

document.getElementById("tries").innerHTML = maxFail;

guessWord();