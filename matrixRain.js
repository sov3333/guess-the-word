const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// PROCEDURAL programming: declare variables and functions step-by-step in the order I want them to be executed

// 4 principles of Object Oriented Programming:
// 1) Encapsulation - wrapping variables and related functions that operate on them in objects
// 2) Abstraction - hiding unnecessary details (internal functionality and implementation details of our objects) from the user and only exposing essential information to the user
// 3) Inheritance
// 4) Polymorphism

class Symbol {
    constructor(x, y, fontSize, canvasHeight){
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = "";
        this.canvasHeight = canvasHeight;
    }
    draw(context){
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length)); 
        // charAt() takes single 'index' argument and returns a new string containing only that one character located at the specific offset of the string
        context.fillText(this.text, this.x*this.fontSize, this.y*this.fontSize);
        if ( this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98 ){ // if reach bottom of canvas && randomize delay
            this.y = 0;
        } else { // else, move it down by 1
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols= [];
        this.#initialize();
        console.log(this.symbols);
    }
    #initialize(){ // private function
        for (let i=0; i<this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }
    resize(width, height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}

const effect = new Effect(canvas.width, canvas.height);

// Use timeStamp and deltaTime to control Frame Rate
let lastTime = 0;
const fps = 30; // adjust fps to adjust speed
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame){
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // add black 5% opacity every animation loop
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0aff0a'; // optimize performance by running this only once animation loop instead of for every character drawn
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}
animate(0);

// make mobile responsive
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
});