var canvas = document.getElementById("screen")
var ctx = canvas.getContext("2d")
var score = 0
var scorehead = document.getElementById("Score")

var w = canvas.width
var h = canvas.height

var difw = w/50
var difh = h/50

var snakeblocks = []

var idlist = 0

class snakebody{
    constructor(x,y,id){

        this.x = x
        this.y = y
        this.id = id

    }
    move(newX, newY){
        this.x = newX
        this.y = newY
    }
    draw(){
        ctx.beginPath()
        ctx.strokeStyle = "blue"
        ctx.rect(this.x*difw, this.y*difh, difw, difh)
        ctx.stroke()
    }
}

class snakeHead{
    constructor(x,y,id){
        this.x = x
        this.y = y
        this.id = id
    }
    move(){
        if(moveDir == "w"){
            this.y -= 1 
        }
        else if(moveDir == "s"){
            this.y += 1
        }
        else if(moveDir == "d"){
            this.x += 1
        }
        else if(moveDir == "a"){
            this.x -= 1
        }
    }
    draw(){
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.strokeStyle = "blue"
        ctx.rect(this.x*difw, this.y*difh, difw, difh)
        ctx.stroke()
    }
    isCrashed(){
        if(this.x < 0 || this.x > 49 || this.y < 0 || this.y > 49){
            return true
        }
        for(var i = 1; i < snakeblocks.length; i++){
            if(this.x == snakeblocks[i].x && this.y == snakeblocks[i].y){
                return true
            }
        }
        return false
    }
    eatenApple(){
        if(apple[0] == this.x && apple[1] == this.y){
            apple = genAppleLoc()
            snakeblocks.push(new snakebody(savelast[0],savelast[1],idlist))
            idlist++
            score ++
            scorehead.innerHTML = "Score: " + score
        }
    }
}


var moveDir = "d"
window.addEventListener("keypress",changedir)
function changedir(e){
    let n = e.keyCode

    if(n == 119 && moveDir != "s"){
        moveDir = "w"
    }
    if(n == 115 && moveDir != "w"){
        moveDir = "s"
    }
    if(n == 100 && moveDir != "a"){
        moveDir = "d"
    }
    if(n == 97 && moveDir != "d"){
        moveDir = "a"
    }
}



function genAppleLoc(){
    var run = true
    while(run){
        rip = false
        var coor = [Math.floor(Math.random()*50), Math.floor(Math.random()*50)]
        for(i in snakeblocks){
            if(i.x == coor[0] && i.y == coor[1]){
                rip = true
                break
            }
        }
        if(!rip){
            run = false
        }
    }  
    return coor 
}

var apple = genAppleLoc()
var savelast = [0,0]


snakeblocks[0] = new snakeHead(5,5,idlist)
idlist++
for(var i = 0; i < 4; i++){
    snakeblocks.push(new snakebody(5-i-1,5,idlist))
    idlist ++
}

run = true
function gameloop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2
    ctx.strokeStyle = "red"
    ctx.rect(apple[0]*difw, apple[1]*difh,difw,difh)
    ctx.stroke()

    savelast = [snakeblocks[snakeblocks.length-1].x, snakeblocks[snakeblocks.length-1].y]

    for(var i = snakeblocks.length-1; i >= 1; i--){
        snakeblocks[i].move(snakeblocks[i-1].x,snakeblocks[i-1].y)
        snakeblocks[i].draw()
    }

    snakeblocks[0].move()
    snakeblocks[0].draw()
    if(snakeblocks[0].isCrashed()){
        run = false
    }
    snakeblocks[0].eatenApple()

    if(run){
        setTimeout(gameloop, 100)
    }
}
window.requestAnimationFrame(gameloop)