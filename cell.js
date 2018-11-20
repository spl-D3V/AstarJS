class Cell {
    constructor(x, y, w){
        this.x = x;
        this.y = y;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.w = w;
        this.color = undefined
        this.neighbours = [];
        this.precedent = undefined;
        this.obstacle = false; //Math.random() < 0.3;
    }
}
Cell.prototype.show = function(){
    if(this.obstacle){
        fill(0);
        rect(this.x*this.w, this.y*this.w, this.w, this.w);
    }else if(this.color){
        fill(this.color);
        rect(this.x*this.w, this.y*this.w, this.w, this.w);
    }
}
Cell.prototype.setColor = function(col){
    this.color = col;
}
Cell.prototype.addNeighbours = function(grid){
    if(this.x-1 >= 0){
        this.neighbours.push(grid[this.x-1][this.y]);
    }
    if(this.y-1 >= 0){
        this.neighbours.push(grid[this.x][this.y-1]);
    }
    if(this.x+1 < ncols){
        this.neighbours.push(grid[this.x+1][this.y]);
    }
    if(this.y+1 < nrows){
        this.neighbours.push(grid[this.x][this.y+1]);
    }
    if(this.x-1 >= 0 && this.y-1 >= 0){
        this.neighbours.push(grid[this.x-1][this.y-1]);
    }
    if(this.x-1 >= 0 && this.y+1 < nrows){
        this.neighbours.push(grid[this.x-1][this.y+1]);
    }
    if(this.x+1 < ncols && this.y-1 >= 0){
        this.neighbours.push(grid[this.x+1][this.y-1]);
    }
    if(this.x+1 < ncols && this.y+1 < nrows){
        this.neighbours.push(grid[this.x+1][this.y+1]);
    }
}
Cell.prototype.heuristic = function(endpoint){
    //this.h = dist(this.x, this.y, endpoint.x, endpoint.y);
    this.h = Math.abs(this.x - endpoint.x) + Math.abs(this.y - endpoint.y);
}
Cell.prototype.computeG = function(cneighbour){
    let cost = Math.sqrt((this.x - cneighbour.x)**2 + (this.y - cneighbour.y)**2);
    return this.g + cost;
}
Cell.prototype.updateG = function(oldg){
    this.g += oldg;
}
Cell.prototype.updateF = function(){
    this.f = this.g + this.h;
}