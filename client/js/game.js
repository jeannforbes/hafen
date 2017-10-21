let Game = function(socket, canvas, mapCanvas){
   
    this.socket = socket;

    this.worlds = {};
    this.currentWorld = undefined;
    this.camera = new Camera();
    this.player = new Player();

    this.characters = {};

    this.loop = undefined;

    this.canvas = canvas;
    this.mapCanvas = mapCanvas;

};

 /*
  *  Setup & game state manipulation
  */

Game.prototype.init = function(){
    this.currentWorld = this.worlds['default'];

    // User input events
};

Game.prototype.tick = function(){

    // Update world state
    this.draw();

    this.loop = window.requestAnimationFrame(this.tick.bind(this));
};

// Starts the game loop
Game.prototype.start = function(){
    let _this = this;

    this.init();

    this.loop = window.requestAnimationFrame(this.tick.bind(this));
};

// Pauses the game loop
Game.prototype.pause = function(){
    if(this.loop) window.cancelAnimationFrame(this.loop);
    this.loop = undefined;
};

// Unpauses the game loop
Game.prototype.unpause = function(){
    if(!this.loop) this.loop = window.requestAnimationFrame(this.tick.bind(this));
};

/*
 *   Drawing, woot woot.
 */

 Game.prototype.draw = function(){
    
 };