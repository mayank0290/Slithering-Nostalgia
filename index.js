// <GAME CONSTANTS>

let inputDir = { x: 0, y: 0 };
const gameOver = new Audio("assets/gameOver.mp3");
const foodSound = new Audio("assets/swallow.mp3");
const moveSound = new Audio("assets/moSo.mp3");
const bgSound = new Audio("assets/bg.mp3");
let speed = 8;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let a= 2,b= 12;

food = {
  x: 2 + Math.round(a + (b - a) * Math.random()), // food will respawn at random spaces b/w 2 and 16 grid after restart
  y: 2 + Math.round(a + (b - a) * Math.random()),
};


// <GAME FUNCTIONS>

function main(ctime) {
  // jis time pe run ho rha h ye vo dega
  window.requestAnimationFrame(main); // yha pe "main" baar baar call hoga or el loop ban jayega
  //   console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    // 0.5 sec jabtak ni hojate, ye screen ko paint nahi karega ya kitna fps control krna h
    return; // no render needed
  }
  lastPaintTime = ctime;
  gameEngine();
}

// When the snake is collided
function isCollide(snake) {
  // if the snake bumps into itself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // if the snake bumps into the wall
  if (
    snakeArr[0].x >= 18 ||
    snakeArr[0].x <= 0 ||
    snakeArr[0].y >= 18 ||
    snakeArr[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  // 1st - update the snake array & Food
  if (isCollide(snakeArr)) {
    gameOver.play();
    bgSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("GAME OVER! Press any key to play again");
    snakeArr = [{ x: 13, y: 15 }];
   
    score = 0;
  }

  // When the snake has eaten the food, body part will be incremented by and the food'll respawn randomly
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodSound.play();
    score +=1;
    scoreT.innerHTML = "Score: " + score; 
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 14;
    food = {
      x: 2 + Math.round(a + (b - a) * Math.random()), // food will respawn at random spaces b/w 2 and 16 grid
      y: 2 + Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the SSSSNAKE-
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] }; // *
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // 2nd - Display the Snake & Food
  // Display the Snake-

  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    // e - variable represening element in the snake array
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head"); //If the condition is true (if index is indeed 0), it means this is the head of the snake. So, it adds a CSS class to the snakeElement called "head" to style it differently. This assumes there's a CSS style named "head" that makes the head look distinct.
    } else {
      snakeElement.classList.add("snake"); // If the condition is false (if index is not 0), it means this is not the head but another part of the snake. In this case, it adds a different CSS class called "snake" to style it as part of the snake body.
    }
    board.appendChild(snakeElement); // snakeElement ko board k under daal dia
  });

  //Display the food -
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// <MAIN LOGIC>
window.requestAnimationFrame(main); // 1st argument is the name of a fn in which a timestamp is passed
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // Starts the game
  bgSound.play();
  moveSound.play();
  muted = true;
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
  }
});
