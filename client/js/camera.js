let Camera = function(){
    this.world = undefined;

    this.width = 200;
    this.height = 100;

    this.loc = new Victor(0,0);
};

Camera.prototype.move = function(){

};

Camera.prototype.draw = function(ctx){
    //console.log(this.world);
    let _this = this;
    for(var y=0; y<this.world.height; y++){
        for(var x=0; x<_this.world.width; x++){
            let tile = _this.world.grid[y][x];

            ctx.save();
            switch(_this.world.grid[y][x].type){
                default:
                    ctx.fillStyle = '#0F0';
                    break;
            }
            ctx.fillRect(x*_this.world.tileSize + _this.world.offset*x, 
                         y*_this.world.tileSize + _this.world.offset*y, 
                         _this.world.tileSize, _this.world.tileSize);
            ctx.restore();
        }
    }
}

Camera.prototype.follow = function(ctx){
    //this.ctx.save();
    //ctx.translate
    //this.draw(ctx);
    //this.ctx.restore();
}