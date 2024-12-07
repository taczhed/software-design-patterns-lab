import { Grid } from '../Grid/Grid'
import { GridFactory } from '../Grid/GridFactory'
import { GridAdapter } from '../Grid/GridAdapter'
import { Config } from '../Config/Config'

// GameController class as State example
export class GameController {
    private grid: Grid
    private running: boolean = true

    constructor(private config: Config) {
        this.grid = GridFactory.randomGrid(config.nCellsY, config.nCellsX)
    }

    getGrid() {
        return this.grid
    }

    toggleRunning() {
        this.running = !this.running
        return this.running
    }

    update() {
        if (this.running) {
            this.grid.generation()
        }
    }

    toggleCell(x: number, y: number) {
        const col = Math.floor(x / this.config.cellWidth)
        const row = Math.floor(y / this.config.cellHeight)
        const value = this.grid.cell(col, row) === 1 ? 0 : 1
        this.grid.setCell(col, row, value)
    }

    saveState() {
        const json = GridAdapter.toJSON(this.grid)
        localStorage.setItem('game-state', json)
    }

    loadState() {
        const savedState = localStorage.getItem('game-state')
        if (savedState) {
            this.grid = GridAdapter.fromJSON(savedState)
            return true
        }
        return false
    }
}
