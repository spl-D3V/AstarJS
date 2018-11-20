let ncols = 100;
let nrows = 100;
let grid = new Array(ncols);
let openSet = [];
let closedSet = [];
let path = [];
let start;
let end;
let stop = false;
let play = false;

function setup(){
    let canvas = createCanvas(800, 800);
    canvas.parent(canvasContainer);
    htmlScripts();
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
    background(255);
    noStroke();
}

function draw(){
    drawObstacles();
    if(play && start && end){
        console.log('hola');
        searchingAlgorithm();
        drawOpenSet();
        drawClosedSet();
        drawPath();    
    }
    if(stop){
        noLoop();
    }
}

function searchingAlgorithm(){
    if(openSet.length > 0){
        let best = 0;
        for(let i = 0; i < openSet.length; i++){
            if(openSet[i].f < openSet[best].f ){
                best = i;
            }
        }
        let current = openSet.splice(best, 1)[0];
        let neighbours = current.neighbours;
        current.setColor(color(0, 255, 0));
        closedSet.push(current);
        if(current === end){
            let temp = current;
            stop = true;
            path.push(temp);
            while(temp.precedent){
                temp.precedent.setColor(color(0, 0, 255));
                path.push(temp.precedent);
                temp = temp.precedent;
            }
        }
        if(!stop){
            for(let i = 0; i < neighbours.length; i++){
                let neighbour = neighbours[i];
                let updateValues = false;
                if(!closedSet.includes(neighbour) && !neighbour.obstacle){
                    let tempG = current.computeG(neighbour);
                    if(openSet.includes(neighbour)){
                        updateValues = tempG < neighbour.g;
                    }else{
                        neighbour.setColor(color(255, 0, 0));
                        openSet.push(neighbour);
                        updateValues = true;
                    }
                    if (updateValues){
                        neighbour.updateG(tempG);
                        neighbour.heuristic(end);
                        neighbour.updateF();
                        neighbour.precedent = current;
                    }
                }
            }
        }
    }
}
function drawObstacles(){
    for(let i=0; i<ncols; i++){
        for(let j=0; j<nrows; j++){
            grid[i][j].show();
        }
    }
}
function drawClosedSet(){
    for(let i=0; i<closedSet.length; i++){
        closedSet[i].show();
    }
}
function drawOpenSet(){
    for(let i=0; i<openSet.length; i++){
        openSet[i].show();
    }
}
function drawPath(){
    for(let i=0; i<path.length; i++){
        path[i].show();
    }
}