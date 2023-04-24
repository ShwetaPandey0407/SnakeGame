// Game Constant & Variable
let inputDir = {x:0 , y:0};
let lastInputDirection = inputDir;
const foodSound = new Audio('/music/food.mp3');
const gameOverSound = new Audio('/music/gameover.mp3');
const moveSound= new Audio('/music/move.mp3');
const musicSound = new Audio('/music/music.mp3');
// let controls = document.querySelectorAll(".controls i")
let score = 0;
let speed = 2;
let lastPaintTime = 0;
let snakeArr = [{x:10,y:10},];
let food = {x:15,y:16};

let board = document.getElementById('board');
// Game functions
function main(ctime){
    window.requestAnimationFrame(main); 
    // console.log(ctime);
    musicSound.play();
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime = ctime;
    
    gameEngine();  
   
}

function isCollide(snake){
    // If you bump into  yourself
    for(let  i=1 ; i< snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
        }
    }
      // If you bump into  wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0 ){
        return true;
    }
   
}



function gameEngine(){
   
    // Part1 : Updating the sanke array and food
     if(isCollide(snakeArr)){
        score = 0 ;
        scoreBox.innerHTML  = "Score : " + score; 
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0 ,y:0};
        alert("Game over! , press any key  to play again.");
        snakeArr = [{x:10,y:10}];
        
     }

     // If you have eaten the food , increment the score and regenerate the food
     if(snakeArr[0].y === food.y && snakeArr[0].x === food.x ){
        score++;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("High Score : ", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score : " + hiscoreval; 
        }
        scoreBox.innerHTML  = "Score : " + score; 
        foodSound.play();
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x ,y :snakeArr[0].y+ inputDir.y}); 
        let a  = 2;
        let b = 16;
        food = {x : Math.round(a + (b-a) * Math.random()) , y : Math.round(a + (b-a) * Math.random()) } 
    }

    // Moving the snake 
    for(let  i =  snakeArr.length -2 ; i>=0 ; i--){
        snakeArr[i+1]  = {...snakeArr[i]};

    }
 
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;






    // Part2 : Display the snake and food 
    board.innerHTML ="";
     // Display the snake
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.style.transform = "rotate(0deg)";
     
        if(index === 0){
            snakeElement.classList.add('head');
            if (inputDir.x == 1) {
                snakeElement.style.transform = "rotate(-90deg)";
             } else if (inputDir.x == -1) {
                snakeElement.style.transform = "rotate(90deg)";
             } else if (inputDir.y == -1) {
                snakeElement.style.transform = "rotate(180deg)";
             } else if (inputDir.y == 1) {
                snakeElement.style.transform = "rotate(0deg)";
             }
        }else{
            snakeElement.classList.add('snake');
        }
    
      
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}






const changeDirction = (e)=> {
    //start the game
        moveSound.play();
        switch(e.key){
            case "ArrowUp" :
                if (lastInputDirection.y == 1) break;
                console.log("ArrowUp");
                inputDir.x = 0;
                inputDir.y = -1;
                break;
            case "ArrowDown" :
                if (lastInputDirection.y == -1) break;
                console.log("ArrowDown");
                inputDir.x = 0;
                inputDir.y = 1;
                break;
            case "ArrowLeft" :
                if (lastInputDirection.x == 1) break;
                console.log("ArrowLeft");
                inputDir.x =-1 ;
                inputDir.y = 0;
                break;
            case "ArrowRight" :
                if (lastInputDirection.x == -1) break;
                console.log("ArrowRight");
                inputDir.x = 1;
                inputDir.y = 0;
                break;
            default :
            inputDir = {x:0,y:0}; 
                break;        
        }
    
}


// Main logic starts here

let hiscore = localStorage.getItem("High Score : ");
if(hiscore===null){
    hiscoreval = 0 ;
    localStorage.getItem("High Score : ", JSON.stringify(hiscoreval))
}else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score : " + hiscore; 
}


// controls.forEach(key =>{
//     key.addEventListener("click" , () => changeDirction({ key:key.dataset.key }));
// });


window.requestAnimationFrame(main); 
window.addEventListener('keydown',changeDirction);
