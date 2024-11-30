// @ts-ignore
import * as P5 from "p5";
import { Config } from './Config/Config';
import { GridFactory } from "./Grid/GridFactory";

const config = Config.instance;
const grid = GridFactory.randomGrid(config.nCellsY, config.nCellsX);

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
        for (let row = 0; row < config.nCellsY; row++) {
            for (let col = 0; col < config.nCellsX; col++) {
                if (grid.cell(col, row) === 1) {
                    p.fill(config.colors.black);
                } else {
                    p.noFill();
                }
                p.rect(col * config.cellWidth, row * config.cellHeight, config.cellWidth, config.cellHeight);
            }
        }
    };

    const nextGeneration = () => grid.generation();

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
            const col = Math.floor(p.mouseX / config.cellWidth);
            const row = Math.floor(p.mouseY / config.cellHeight);
            if (col >= 0 && col < config.nCellsX && row >= 0 && row < config.nCellsY) {
                const value = grid.cell(col, row) === 1 ? 0 : 1;
                grid.setCell(col, row, value);
            }
        }
    };
};

new P5(sketch);