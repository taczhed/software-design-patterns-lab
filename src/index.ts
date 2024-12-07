import * as P5 from "p5";
import { Config } from './Config/Config';
import { GridFactory } from "./Grid/GridFactory";
import { ButtonBuilder } from "./Button/Button";
import {GridAdapter} from "./Grid/GridAdapter";

const config = Config.instance;

const app = (p: P5) => {
    let running = true;
    let grid = GridFactory.randomGrid(config.nCellsY, config.nCellsX);

    const toggleButton = new ButtonBuilder().setLabel('Playing').build();
    const saveButton = new ButtonBuilder().setLabel('Save').setPosition(config.saveButtonX, config.saveButtonY).build();
    const loadButton = new ButtonBuilder().setLabel('Load').setPosition(config.loadButtonX, config.loadButtonY).build();

    p.setup = () => {
        p.createCanvas(config.width, config.height);
        setInterval(() => running && grid.generation(), 1000)
    };

    p.draw = () => {
        p.background(config.colors.white);
        grid.draw(p);
        toggleButton.draw(p);
        saveButton.draw(p);
        loadButton.draw(p);
    };

    p.mousePressed = () => {
        if (toggleButton.isClicked(p.mouseX, p.mouseY)) {
            running = !running;
            toggleButton.setLabel(running ? 'Playing' : 'Stopped')
        }

        if (saveButton.isClicked(p.mouseX, p.mouseY)) {
            localStorage.setItem('game-state', GridAdapter.toJSON(grid));
            saveButton.setLabel('Saved successfully!')
            setTimeout(() => saveButton.setLabel('Save'), 3000)
        }

        if (loadButton.isClicked(p.mouseX, p.mouseY)) {
            const savedState = localStorage.getItem('game-state');
            if (savedState) {
                grid = GridAdapter.fromJSON(savedState);
                loadButton.setLabel('Loaded successfully!')
            } else {
                loadButton.setLabel('Error, grid not found!')
            }
            setTimeout(() => loadButton.setLabel('Load'), 3000)
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
