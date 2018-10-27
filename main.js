let openSet = [];
let closedSet = [];
let ncols = 100;
let nrows = 100;
let grid = new Array(ncols);
let path = [];
let start;
let end;
let stop = false;

function setup(){
    createCanvas(800, 800);
    for(let i = 0; i < ncols; i++){
        grid[i] = new Array(nrows);
        for(let j=0; j<nrows; j++){
            grid[i][j] = new Cell(i, j, width/ncols);
        }
    }
    for(let i = 0; i < ncols; i++){
        for(let j=0; j<nrows; j++){
            grid[i][j].addNeighbours(grid);
        }
    }
    start = grid[0][0];
    end = grid[ncols-1][nrows-1];
    openSet.push(start);
    background(255);
    noStroke();
}

function draw(){
    if(openSet.length > 0){
        let best = 0;
        for(let i =0; i<openSet.length; i++){
            if(openSet[i].f < openSet[best].f ){
                best = i;
            }
        }
        let current = openSet.splice(best, 1)[0];
        let neighbours = current.neighbours;
        closedSet.push(current);
        if(current === end){
            path = [];
            stop = true;
            let temp = current;
            path.push(temp);
            while(temp.precedent){
                path.push(temp.precedent);
                temp = temp.precedent;
            }
        }
        for(let i = 0; i < neighbours.length; i++){
            let neighbour = neighbours[i];
            let updateValues = false;
            if(!closedSet.includes(neighbour) && !neighbour.obstacle){
                let tempG = current.g + 1;
                if(openSet.includes(neighbour)){
                    if (tempG < neighbour.g){
                        neighbour.g = tempG;
                        updateValues = true;
                    }
                }else{
                    neighbour.g = tempG;
                    openSet.push(neighbour);
                    updateValues = true;
                }
                if (updateValues){
                    neighbour.heuristic(end);
                    neighbour.updateF();
                    neighbour.precedent = current;
                }
            }
        }
    }
    for(let i=0; i<ncols; i++){
        for(let j=0; j<nrows; j++){
            grid[i][j].show();
        }
    }
    for(let i=0; i<openSet.length; i++){
        openSet[i].show(color(255, 0, 0));
    }
    for(let i=0; i<closedSet.length; i++){
        closedSet[i].show(color(0, 255, 0));
    }
    for(let i=0; i<path.length; i++){
        path[i].show(color(0, 0, 255));
    }
    if(stop){
        noLoop();
    }
}