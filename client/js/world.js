let World = function(){

    this.grid = [[]]; // 2d array of tiles
    this.tileSize = 40;
    this.offset = 1;
};

let Tile = function(type){
    this.type = type;
    this.walkable = true;
    this.swimmable = false;
};

World.prototype.update = function(){

};

World.prototype.parse = function(data){
    console.log(data);
    let _this = this;
    this.height = 0;
    this.width = 0;

    for(var i=0; i<data.length; i++){
        let d = data[i];
        switch(d){
            case '\n':
                _this.height++;
                _this.width = -1;
                _this.grid[_this.height] = [];
                break;
            default:
                _this.grid[_this.height][_this.width] = new Tile(d);
                break;
        }
        _this.width++;
    }

    this.height++;

    console.log(this);
};