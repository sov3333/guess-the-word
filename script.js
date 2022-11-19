/**
 * words = [`asd`, `asdfg`, `qweqe`, ... ];
 * 
 * game = {};
 * function chooseWord() == return random word from array
 * 
 * class Letter() ==> top create an object of the letter details
 * class Word() ==> generate Letter objects, store letters as objects to array called letters
 * 
 * --> letters = [ {value: 'a', hidden: true } , {} , {} , ... ];
 * 
 * function startGame() ==
 * function playGame() == 
 */ 

const words = [`alpha`, `altar`, `after`, `afoot`, `apple`, `apply`, `artist`, `archer`, `alpaca`, `alpine`];

function chooseWord() {
    return words[ Math.floor( Math.random() * (words.length) ) ]
}

game = {
    guesses: 0,
    guessedLetters: [],
    isOver: () => {
        if (thisGame.isFound() === true){
            game.guesses = 0;
            return true;
        }
        else if ( game.guesses === 0 ) return true;
        else return false;
    },
    overMessage: () => {
        if (thisGame.letters.every((e) => {return !e.hidden;}) === true) {
            return `You win! You guessed ${thisGame.string.toUpperCase()}. Refresh to go again.`;
        } else if (game.guesses === 0) {
            return `You lose! The word was ${thisGame.string.toUpperCase()}. Refresh to try again.`;
        } else return false;
    },
};

class Letter {
    constructor(char){
        this.value = char;
        this.hidden = true;
    }
    show(){
        this.hidden = false;
    }
    display(){
        if (this.hidden === true) return `_`;
        else return this.value;
    }
}

class Word {
    constructor(string){
        this.string = string;
        this.letters = [];
    }
    getLetters(newWord){
        for (let i=0 ; i<newWord.length ; i++){
            let currentLetter = new Letter(this.string[i])
            this.letters.push(currentLetter);
        }     
        // TODO: FIX BUG (if call again, will add more chars to letters array)
        // function still can be called multiple times to distort `letters` array
    }
    isFound(){
        if ( this.letters.every((e) => {return !e.hidden;}) === true ) {
            game.overMessage();
            return true;
        } else return false;
    }
    test(letter){
        for (let i=0; i<thisGame.letters.length; i++){
            if (thisGame.letters[i].value === letter) { // if letter was found
                this.letters[i].hidden = false; // update "hidden" to false
            } 
        } 
        if (game.guessedLetters.includes(letter) === false){ // if game.guessedLetters DOES NOT contain LETTER
            game.guessedLetters.push(letter); // push LETTER to game.guessedLetters
            return false; // if letter not found, return false
        } else return true; // if letter was found, return true
    }
    render(){
        let stringArray = [];
        for (let i=0; i<this.string.length; i++){
            stringArray.push(thisGame.letters[i].display())
        }
        return stringArray.join(` `);
    }
}

function startGame() {
    game.guesses = 10;
    game.guessedLetters = [];
    let currentWord = chooseWord();
    let currentGame = new Word(currentWord);
    currentGame.getLetters(currentWord);
    thisGame = currentGame;
    // ```
    // Word {
    //   string: 'archer',
    //   letters: [
    //     Letter { value: 'a', hidden: true },
    //     Letter { value: 'r', hidden: true },
    //     Letter { value: 'c', hidden: true },
    //     Letter { value: 'h', hidden: true },
    //     Letter { value: 'e', hidden: true },
    //     Letter { value: 'r', hidden: true }
    //   ]
    // }
      // ```
    let name = prompt("please write your name", "Champion");
    console.log(`Hello ${name}, let's start!`)
    window.alert(`Hello ${name}, let's start!`);
    playGame();
}

function playGame() {
    // render word in "guessed state"
    console.log(`THE WORD IS:`, thisGame.render());

    // for debugging
    // console.log(thisGame);
    // console.log(thisGame.string);

    // provide hint
    if (game.guesses === 8 || game.guesses === 5 || game.guesses === 3 ) {
        console.log(`HINT: contains the letter`, thisGame.string[Math.floor(Math.random() * thisGame.string.length)]);
    }
    
    // prompt to enter letter
    let guessLetter = prompt("please write a character").toLowerCase();
    
    thisGame.test(guessLetter); // check for match then switch hidden, and push to array if not found
    console.log(`Your Guessed Letters:`, game.guessedLetters);
    
    game.guesses--;
    console.log(`Guesses Remaining:`, game.guesses)

    if (game.isOver() === true){
        console.log(game.overMessage());
        window.alert(game.overMessage());
    } else playGame();
}

let thisGame;

console.log(`Let's start the game!`);
startGame();