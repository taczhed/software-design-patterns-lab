import { Grid } from './Grid'

// GridAdapter class as Adapter example
export class GridAdapter {
    static toJSON(grid: Grid): string {
        return JSON.stringify(grid.getInfo());
    }

    static fromJSON(json: string): Grid {
        const { state, rows, cols } = JSON.parse(json);
        const grid = new Grid(rows, cols);
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                grid.setCell(col, row, state[row][col]);
            }
        }
        return grid;
    }
}