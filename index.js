// <GAME CONSTANTS>

const inputDir = { x: 0, y: 0 };
const sounds = {
    gameOver: new Audio("assets/gameOver.mp3"),
    food: new Audio("assets/swallow.mp3"),
    move: new Audio("assets/moSo.mp3"),
    bg: new Audio("assets/bg.mp3")
};
const speed = 8;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = generateFood();

// <GAME FUNCTIONS>

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // Check if snake collides with itself or walls
    return snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y) ||
        snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0;
}

function generateFood() {
    const a = 2, b = 14;
    return {
        x: Math.floor(a + (b - a + 1) * Math.random()),
        y: Math.floor(a + (b - a + 1) * Math.random())
    };
}

function resetGame() {
    sounds.gameOver.play();
    sounds.bg.pause();
    inputDir.x = inputDir.y = 0;
    alert("GAME OVER! Press any key to play again");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
}

function gameEngine() {
    // Update snake array and food
    if (isCollide(snakeArr)) {
        resetGame();
        return;
    }

    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        sounds.food.play();
        score += 1;
        scoreT.innerHTML = "Score: " + score;
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        });
        food = generateFood();
    }

    // Move the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Display the snake and food
    board.innerHTML = "";
    snakeArr.forEach((segment, index) => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
      
