import * as P5 from "p5";
import { Config } from './Config/Config';
import { GridFactory } from "./Grid/GridFactory";
import { ButtonBuilder } from "./Button/Button";

const config = Config.instance;

const app = (p: P5) => {
    let running = true;

    const grid = GridFactory.randomGrid(config.nCellsY, config.nCellsX);
    const toggleButton = new ButtonBuilder().setLabel('Next Generation').build()

    p.setup = () => {
        p.createCanvas(config.width, config.height);
    };

    p.draw = () => {
        if (!running) return;
        p.background(config.colors.white);
        grid.draw(p)
        toggleButton.draw(p)
    };

    p.mousePressed = () => {
        if (toggleButton.isClicked(p.mouseX, p.mouseY)) {
            grid.generation();
        }

        if (grid.isClicked(p.mouseX, p.mouseY)) {
            const col = Math.floor(p.mouseX / config.cellWidth);
            const row = Math.floor(p.mouseY / config.cellHeight);
            const value = grid.cell(col, row) === 1 ? 0 : 1;
            grid.setCell(col, row, value);
        }
    };
};

new P5(app);