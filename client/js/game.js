let Game = function(canvas, canvasMap, socket){
   
    this.socket = socket || undefined;

    this.worlds = {};

    this.camera = new Camera();
    this.map = new Mapp();
    
    this.player = new Player();

    this.characters = {};

    this.loop = undefined;

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvasMap = canvasMap;
    this.ctxMap = this.canvasMap.getContext('2d');

    this.timer = undefined;
    this.time = 0;

    this.client = new HttpClient();

};

 /*
  *  Setup & game state manipulation
  */

Game.prototype.init = function(){
    let _this = this;
    // Canvas
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.canvasMap.width = window.innerWidth/5;
    this.canvasMap.height = window.innerHeight/5;

    // Get a world, any world
    this.client.get('http://localhost:3000/default.world', function(res){
        let dw = new World();
        dw.parse(res);
        _this.camera.world = dw;
    });

    // Intervals
    this.timer = setInterval(function(){_this.time++;}, 100);

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
    let _this = this;

    if(this.camera.world){
        _this.camera.draw(_this.ctx);
        _this.map.draw(_this.ctxMap, _this.camera.world);
    } else {
        this.drawLoadingScreen();
    }
 };

Game.prototype.drawLoadingScreen = function(){
    let arcStart = Math.PI/4;
    let arcEnd = Math.PI/2;
    let radius = 40;

    // Draw semi-opaque background
    this.ctx.save();
    this.ctx.fillStyle = '#222';
    this.ctx.globalAlpha = 0.15;
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.restore();

    // Loading icon
    this.ctx.save();
    this.ctx.fillStyle = '#DBF8DE';
    this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
    this.ctx.rotate(Math.PI/2 * this.time/10);
    this.ctx.beginPath();
    this.ctx.arc(0,0, radius, arcStart, arcEnd);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();

    // Draw to the map
    this.ctxMap.save();
    this.ctxMap.globalAlpha = 0;
    this.ctxMap.fillStyle = '#000';
    this.ctxMap.fillRect(0,0,this.canvas.width,this.canvas.height);
    this.ctxMap.restore();
};

/*
 *  HttpClient courtesy of tggagne
 *    find it here: https://stackoverflow.com/questions/247483/http-get-request-in-javascript
 */

 let HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}