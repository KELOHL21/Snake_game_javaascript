
 const board = document.querySelector('.play-board');

 const scoreboard = document.querySelector('.score');

 const highscore_board = document.querySelector('.high-score');

 let foodX ; let foodY ;

 let gameOver = false;

 let snakeX = 4 ; let snakeY = 5 ;
 
 let snakeBody = [];

 let velocityX = 0; let velocityY = 0 ;

 let setIntervalId;

 let score = 0;

//  Getting High score from local storage
 let high_score = localStorage.getItem("high-score") || 0;

//  Setting High Score to whats stored in localhost
 highscore_board.innerHTML = `Score : ${high_score}`


 const foodPosition = () => {

   //Food will be position between 1 - 30 randomly

   foodX = Math.floor(Math.random() * 30) + 1;

   foodY = Math.floor(Math.random() * 30) + 1;

 } 

 const handleGameOver = () => {
   // Clearing the timer 
   clearInterval(setIntervalId);
   // Alert pops up when Game Over is triggered
   alert('Game Over! Press OK to restart.');
   // and reloading the page on game over
   location.reload();
 }

 const changeDirections = (e) => {
   // Based on which key is pressed the velocity changes
   // Not allowing the snake to go in the opposite direction
   if (e.key === 'ArrowUp' && velocityY != 1) {
      velocityX = 0;
      velocityY = -1;
   }else if (e.key === 'ArrowDown' && velocityY != -1) {
      velocityX = 0;
      velocityY = 1;
   }else if (e.key === 'ArrowLeft' && velocityX != 1) {
      velocityX = -1;
      velocityY= 0;
   }else if (e.key === 'ArrowRight' && velocityX != -1) {
      velocityX = 1;
      velocityY = 0;
   }
 }

 const initGame = () => {

   if (gameOver) {
      // if gameOver occures return and call the handleGameOver function 
      return handleGameOver();
   }

   // If FoodX and FoodY were swopped them the code would crash 
   // Not sure why tho ?
   // Ill figure it out !
   let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`

   if (snakeX === foodX && snakeY === foodY) {

      // Changing the foods position every time the snake eats it (makes contact)
      foodPosition();

      // // Pushing the eaten food into the Snake Array
      snakeBody.push([foodX, foodY]);

      // Adding 1 to score once food is eaten
      score ++; 

      // Setting High score to score value if score is greater than high score
      high_score = score >= high_score ? score : high_score;
      // Setting highscore in the local storage
      localStorage.setItem('high-score', high_score);

      scoreboard.innerHTML = `Score : ${score}`;


   }

   for (let i = snakeBody.length - 1; i > 0 ; i--) {
      //Moving the food (div) that been eaten forward onto the snakes body
      snakeBody[i] = snakeBody[i - 1];
   }

   // Setting the snakes  body to the intial snakes starting point
   snakeBody[0]=[snakeX,snakeY] ; 

   // Updating snake based off velocity
   snakeX += velocityX;
   snakeY += velocityY;

   if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY >30 ) {
      // Checking whether the snake position === true
      gameOver = true;
   }

   for (let i = 0; i < snakeBody.length; i++) {
      htmlMarkup += `<div class="snakehead" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
      // When the snake hits itself game over
      if( i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
         gameOver = true;
      }
   }
   
   board.innerHTML =htmlMarkup;
 }
 
 foodPosition();

// Allows the snake to continue to move
setIntervalId = setInterval(initGame, 120);

//  Clicking of arrowKeys
document.addEventListener('keydown', changeDirections);