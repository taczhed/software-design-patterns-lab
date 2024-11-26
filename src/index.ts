// Import required modules
// @ts-ignore
import * as P5 from "p5";

// Grid dimensions and simulation settings
const width = 800;
const height = 600;
const nCellsX = 40;
const nCellsY = 30;
const cellWidth = width / nCellsX;
const cellHeight = height / nCellsY;

// Colors
const white = [255, 255, 255];
const black = [0, 0, 0];
const gray = [128, 128, 128];
const green = [0, 255, 0];

// Button dimensions
const buttonWidth = 200;
const buttonHeight = 50;
const buttonX = (width - buttonWidth) / 2;
const buttonY = height - buttonHeight - 10;

// Game state
let gameState: number[][] = Array.from({ length: nCellsX }, () =>
    Array.from({ length: nCellsY }, () => (Math.random() < 0.2 ? 1 : 0))
);

// P5 sketch function
const sketch = (p: P5) => {
    let running = true;

    p.setup = () => {
        p.createCanvas(width, height);
    };

    const drawButton = () => {
        p.fill(green);
        p.rect(buttonX, buttonY, buttonWidth, buttonHeight);
        p.fill(black);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(18);
        p.text("Next Generation", buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
    };

    const drawGrid = () => {
        p.stroke(gray);
        for (let x = 0; x < width; x += cellWidth) {
            for (let y = 0; y < height; y += cellHeight) {
                p.line(x, 0, x, height);
                p.line(0, y, width, y);
            }
        }
    };

    const drawCells = () => {
        for (let x = 0; x < nCellsX; x++) {
            for (let y = 0; y < nCellsY; y++) {
                if (gameState[x][y] === 1) {
                    p.fill(black);
                } else {
                    p.noFill();
                }
                p.rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
            }
        }
    };

    const nextGeneration = () => {
        const newState: number[][] = JSON.parse(JSON.stringify(gameState));

        for (let x = 0; x < nCellsX; x++) {
            for (let y = 0; y < nCellsY; y++) {
                const nNeighbors =
                    gameState[(x - 1 + nCellsX) % nCellsX][(y - 1 + nCellsY) % nCellsY] +
                    gameState[x][(y - 1 + nCellsY) % nCellsY] +
                    gameState[(x + 1) % nCellsX][(y - 1 + nCellsY) % nCellsY] +
                    gameState[(x - 1 + nCellsX) % nCellsX][y] +
                    gameState[(x + 1) % nCellsX][y] +
                    gameState[(x - 1 + nCellsX) % nCellsX][(y + 1) % nCellsY] +
                    gameState[x][(y + 1) % nCellsY] +
                    gameState[(x + 1) % nCellsX][(y + 1) % nCellsY];

                if (gameState[x][y] === 1 && (nNeighbors < 2 || nNeighbors > 3)) {
                    newState[x][y] = 0;
                } else if (gameState[x][y] === 0 && nNeighbors === 3) {
                    newState[x][y] = 1;
                }
            }
        }

        gameState = newState;
    };

    p.draw = () => {
        if (!running) return;
        p.background(white);
        drawGrid();
        drawCells();
        drawButton();
    };

    p.mousePressed = () => {
        if (
            p.mouseX >= buttonX &&
            p.mouseX <= buttonX + buttonWidth &&
            p.mouseY >= buttonY &&
            p.mouseY <= buttonY + buttonHeight
        ) {
            nextGeneration();
        } else {
            const x = Math.floor(p.mouseX / cellWidth);
            const y = Math.floor(p.mouseY / cellHeight);
            if (x >= 0 && x < nCellsX && y >= 0 && y < nCellsY) {
                gameState[x][y] = gameState[x][y] === 1 ? 0 : 1;
            }
        }
    };
};

// Initialize P5 sketch
new P5(sketch);
