import * as P5 from 'p5'
import { Config } from './Config/Config'
import { ButtonBuilder } from './Button/Button'
import { GameController } from './GameController/GameController'

const params = new URLSearchParams(window.location.href);
const n = params.get('n') ? Number(params.get('n')) : null
const config = Config.instance

const app = (p: P5) => {
    const game = new GameController(config)
    const toggleButton = new ButtonBuilder().setLabel('Playing').build()
    const saveButton = new ButtonBuilder().setLabel('Save').setPosition(config.saveButtonX, config.saveButtonY).build()
    const loadButton = new ButtonBuilder().setLabel('Load').setPosition(config.loadButtonX, config.loadButtonY).build()

    p.setup = () => {
        p.createCanvas(config.width, config.height)
        setInterval(() => game.update(), (n || config.interval) * 1000)
    }

    p.draw = () => {
        p.background(config.colors.white)
        game.getGrid().draw(p)
        toggleButton.draw(p)
        saveButton.draw(p)
        loadButton.draw(p)
    }

    p.mousePressed = () => {
        if (toggleButton.isClicked(p.mouseX, p.mouseY)) {
            const running = game.toggleRunning()
            toggleButton.setLabel(running ? 'Playing' : 'Stopped')
        }

        if (saveButton.isClicked(p.mouseX, p.mouseY)) {
            game.saveState()
            saveButton.setLabel('Saved successfully!')
            setTimeout(() => saveButton.setLabel('Save'), 3000)
        }

        if (loadButton.isClicked(p.mouseX, p.mouseY)) {
            if (game.loadState()) {
                loadButton.setLabel('Loaded successfully!')
            } else {
                loadButton.setLabel('Error, grid not found!')
            }
            setTimeout(() => loadButton.setLabel('Load'), 3000)
        }

        if (game.getGrid().isClicked(p.mouseX, p.mouseY)) {
            game.toggleCell(p.mouseX, p.mouseY)
        }
    }
}

new P5(app)
