let Player = function(){
    this.color = 'red';
    this.loc = Victor(0,0);
};

Player.prototype.move = function(loc){
    this.loc = loc;
};

Player.prototype.interact = function(obj){

};

Player.prototype.draw = function(ctx){
    ctx.save();

    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, 0, Math.PI*2);
    ctx.fill();

    ctx.restore();
};