let htmlScripts = function(){
    canvas.addEventListener("click", addStartEnd);
    canvas.addEventListener("mousemove", movingObstacle);
}
let addStartEnd = function(){
    let x = Math.floor(mouseX * ncols / width);
    let y = Math.floor(mouseY * nrows / height);
    if (!start){
        start = grid[x][y];
        start.setColor(color(0, 0, 255));
        openSet.push(start);
        return false;
    }
    if(start && !end){
        end = grid[x][y];
        end.setColor(color(0, 0, 255));
        return false;
    }
}
let movingObstacle = function(evt){
    if (start && end && mouseIsPressed){
        let x = Math.floor(mouseX * ncols / width);
        let y = Math.floor(mouseY * nrows / height);
        grid[x][y].obstacle = true;
        return false;
    }
}