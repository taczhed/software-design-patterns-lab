// @ts-ignore
import * as P5 from "p5";
import { Config } from './Config';


const config = Config.instance;

// Game state
let gameState: number[][] = Array.from({ length: config.nCellsX }, () =>
    Array.from({ length: config.nCellsY }, () => (Math.random() < 0.2 ? 1 : 0))
);

// P5 sketch function
const sketch = (p: P5) => {
    let running = true;

    p.setup = () => {
        p.createCanvas(config.width, config.height);
    };

    const drawButton = () => {
        p.fill(config.colors.green);
        p.rect(config.buttonX, config.buttonY, config.buttonWidth, config.buttonHeight);
        p.fill(config.colors.black);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(18);
        p.text(
            "Next Generation",
            config.buttonX + config.buttonWidth / 2,
            config.buttonY + config.buttonHeight / 2
        );
    };

    const drawGrid = () => {
        p.stroke(config.colors.gray);
        for (let x = 0; x < config.width; x += config.cellWidth) {
            for (let y = 0; y < config.height; y += config.cellHeight) {
                p.line(x, 0, x, config.height);
                p.line(0, y, config.width, y);
            }
        }
    };

    const drawCells = () => {
        for (let x = 0; x < config.nCellsX; x++) {
            for (let y = 0; y < config.nCellsY; y++) {
                if (gameState[x][y] === 1) {
                    p.fill(config.colors.black);
                } else {
                    p.noFill();
                }
                p.rect(x * config.cellWidth, y * config.cellHeight, config.cellWidth, config.cellHeight);
            }
        }
    };

    const nextGeneration = () => {
        const newState: number[][] = JSON.parse(JSON.stringify(gameState));

        for (let x = 0; x < config.nCellsX; x++) {
            for (let y = 0; y < config.nCellsY; y++) {
                const nNeighbors =
                    gameState[(x - 1 + config.nCellsX) % config.nCellsX][(y - 1 + config.nCellsY) % config.nCellsY] +
                    gameState[x][(y - 1 + config.nCellsY) % config.nCellsY] +
                    gameState[(x + 1) % config.nCellsX][(y - 1 + config.nCellsY) % config.nCellsY] +
                    gameState[(x - 1 + config.nCellsX) % config.nCellsX][y] +
                    gameState[(x + 1) % config.nCellsX][y] +
                    gameState[(x - 1 + config.nCellsX) % config.nCellsX][(y + 1) % config.nCellsY] +
                    gameState[x][(y + 1) % config.nCellsY] +
                    gameState[(x + 1) % config.nCellsX][(y + 1) % config.nCellsY];

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
        p.background(config.colors.white);
        drawGrid();
        drawCells();
        drawButton();
    };

    p.mousePressed = () => {
        if (
            p.mouseX >= config.buttonX &&
            p.mouseX <= config.buttonX + config.buttonWidth &&
            p.mouseY >= config.buttonY &&
            p.mouseY <= config.buttonY + config.buttonHeight
        ) {
            nextGeneration();
        } else {
            const x = Math.floor(p.mouseX / config.cellWidth);
            const y = Math.floor(p.mouseY / config.cellHeight);
            if (x >= 0 && x < config.nCellsX && y >= 0 && y < config.nCellsY) {
                gameState[x][y] = gameState[x][y] === 1 ? 0 : 1;
            }
        }
    };
};

// Initialize P5 sketch
new P5(sketch);
