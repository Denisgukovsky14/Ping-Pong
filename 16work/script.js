var canvas;
var canvasContext;
var ballX = 55;
var ballY = 55;
var ballSpeedX = 5;
var ballSpeedY = 2;
var paddle1Y = 300; 
var paddle2Y = 300;  
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
var playerScore = 0;
var computerScore = 0;
const WINNING_SCORE = 5;
var showingWInScreen = false; 
    	
	
function calculateMousePos(event){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY 
    };
}
    
function handleMouseClick(event){
    if(showingWInScreen){
        playerScore = 0;
        computerScore = 0;
        showingWInScreen = false;
    }
}
    
window.onload = function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 30;
    setInterval(function(){
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);
    
    canvas.addEventListener('mousedown', handleMouseClick);
    canvas.addEventListener('mousemove', function(event){
        var mousePos = calculateMousePos(event);
        paddle1Y = mousePos.y;
        
    });
   
}

function ballReset(){
    if(playerScore >= WINNING_SCORE || computerScore >= WINNING_SCORE){
        showingWInScreen = true; 
    }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;

}
    
function computerMovement(){
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if(paddle2YCenter < ballY-35){
        paddle2Y = paddle2Y + 6;
    }else if (paddle2YCenter > ballY+35){
        paddle2Y = paddle2Y - 6;
    }
} 
    

function moveEverything(){
    if(showingWInScreen){
        return;
    }
   computerMovement();
   ballX = ballX + ballSpeedX;
   ballY = ballY + ballSpeedY; 
    
    if(ballX < PADDLE_WIDTH){
        if(ballY > paddle2Y-(PADDLE_HEIGHT/2) && ballY < (paddle2Y+PADDLE_HEIGHT/2)){
            ballSpeedX = -ballSpeedX;
             var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.2;
        }else{
        playerScore++; //INCREMENT SCORE BEFORE RESETTING THE BALL
        ballReset();
        }
    }  
    
    if(ballX > canvas.width-PADDLE_WIDTH){
        if(ballY > paddle1Y-(PADDLE_HEIGHT/2) && ballY < (paddle1Y+PADDLE_HEIGHT/2)){
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.2;
        }else{
        computerScore++;
        ballReset();
        }
    }
    
   if(ballY > canvas.height || ballY < 0){
       ballSpeedY = -ballSpeedY;
   }
}
    
function drawNet(){
    for(var i=0 ; i < canvas.height ; i+=40){
        colorRect(canvas.width/i,'white');
    }
}

function drawEverything(){
    colorRect(0,0,canvas.width,canvas.height,'white');
    if(showingWInScreen){
        canvasContext.fillStyle = 'black';
        if(playerScore >= WINNING_SCORE){
            canvasContext.fillText("Вы победили",370,300);
        }else if(computerScore >= WINNING_SCORE){
            canvasContext.fillText("Вы проиграли",355,300);
        }
        canvasContext.fillText("Нажми для продолжения",350,350);
        return;
    }
    drawNet();
    colorRect(0,(paddle2Y-(PADDLE_HEIGHT/2)), PADDLE_WIDTH,PADDLE_HEIGHT,'blue');
    colorRect((canvas.width-PADDLE_WIDTH),(paddle1Y-(PADDLE_HEIGHT/2)) ,PADDLE_WIDTH,PADDLE_HEIGHT,'blue');
    colorCircle(ballX, ballY, 16, 'red'); 
    canvasContext.fillText(computerScore, 100, 100); canvasContext.fillText(playerScore, canvas.width-100, 100);
}

function colorRect(leftX,topY,width,height,drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY,width,height);
}
    
function colorCircle(centreX, centreY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centreX, centreY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}
