// game constants and variables 
let inputDir = {x: 0 , y:0};
const foodsound = new Audio('food.mp3');
const movesound = new Audio('move.mp3');
const musicsound = new Audio('music.mp3');
const gameoversound = new Audio('gameover.mp3');
let speed = 2;
let score=0;
let lastPaintTime=0;  // last kab render hui thi screen 
let snakeArr = [
    {x: 13 , y: 15}
]
let food = {x: 6 , y: 7};

// game loop is very imp component in any game. Render hota rehta h 
// Jab bhi animation ko render kr rhe ho tab its recommended to se requestanimationframe

// Game Functions 
function main(ctime){  // ctime is the current time 
        window.requestAnimationFrame(main);  // main firse call hota rhega , game loop bngya ye 
       // console.log(ctime);
        if((ctime-lastPaintTime)/1000 < 1/speed) {    // kitne time mein render hona chaahiye uske liye h ye
            return;  
        }
        lastPaintTime=ctime;
        gameEngine();
         
}

function iscollide(snake){
// if u bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
       if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        return true;
    }

// bump into wall 
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snakeArr[0].y <= 0 ){
            return true;
    }
    return false;
}

function gameEngine(){
    // Part 1 -> updating the snake variable (array) and food 
        if(iscollide(snakeArr)){
           gameoversound.play();
            movesound.pause();
            inputDir={x:0,y:0};
      //   alert(" game over press any key to play again");
            snakeArr=[{x: 13 , y: 15}]; // reset
          //   musicsound.play();
            score=0;
        }

        // if u have eaten the food increment the score and regenerate the food 
        if(snakeArr[0].y ===food.y && snakeArr[0].x ===food.x){
            foodsound.play();
            score ++;
            if(score > Highscoreval){
                Highscoreval=score;
                localStorage.setItem("HighScore",JSON.stringify(Highscoreval));
                HighScoreBox.innerHTML= " HighScore: " + Highscoreval;
            }
            scoreBox.innerHTML= " Score : " + score;
            snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
            let a=2;
            let b=16;
        food= {x: Math.round(a + (b-a)* Math.random()) , y: Math.round(a + (b-a)* Math.random()) } // to generate random nos between 2 given nos a and b , a and b pta chlenge grid ki size se 
        }
// Math.round() -> integer 

            // MOVING THE SNAKE 
        // har ek element ko 1-1 se aage krdo 
        for (let i=snakeArr.length-2; i>=0 ; i--){
                snakeArr[i+1]= {...snakeArr[i]} ; // destructure krna is important 
        }
        snakeArr[0].x = snakeArr[0].x + inputDir.x;
        snakeArr[0].y = snakeArr[0].y + inputDir.y;


        // Part 2 -> Render/ Display the snake and food 
         // Display the snake 
         board.innerHTML= " "; // board ko khaali krdo 
         snakeArr.forEach((e,index)=>{
            snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart= e.y;
            snakeElement.style.gridColumnStart= e.x;
            
            if (index==0){ // mtlb pehla element h 
                snakeElement.classList.add('head');
            }
            else {
                snakeElement.classList.add('snake');
            }
            board.appendChild(snakeElement);
    });

    // Display the food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart= food.y;
    foodElement.style.gridColumnStart= food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main logic starts here 
let HighScore =localStorage.getItem("Highscore");
if(HighScore=== null){
    Highscoreval=0;
    localStorage.setItem("HighScore",JSON.stringify(Highscoreval));
}
else{
    Highscoreval=JSON.parse(HighScore);
    HighScoreBox.innerHTML = "HighScore: " + HighScore;
}
window.requestAnimationFrame(main);  // reqanimframe is better to use than setinterval or settimeout. why? google
window.addEventListener('keydown', e=>{
    inputDir = {x:0,y:1}  // start the game 
   movesound.play();

    switch (e.key) { 
        case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x= 0;   // x=0 toh y= non-zero and vice-versa 
        inputDir.y= -1;  // upr le ja rhe h , origin starts from right corner toh means ki y mein kam ho rhi h value 
        break;

        case "ArrowDown":
         console.log("ArrowDown");
         inputDir.x= 0;
         inputDir.y= 1;
        break;

         case "ArrowLeft":
         console.log("ArrowLeft");
         inputDir.x= -1;
         inputDir.y= 0;
        break;

        case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x= 1;
        inputDir.y=0 ;
        break;
    
        default:
            break;
    }
});  

//jb bhi kisi ne keydown kri toh ye listen krega , and whenever keydown hoga toh ye aage waala event run hojaaega  