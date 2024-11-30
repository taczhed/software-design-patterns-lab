import { Grid } from "./Grid";

// GridFactory class as Factory-Method example
export class GridFactory {
    static randomGrid(rows: number, cols: number, aliveProbability: number = 0.2): Grid {
        const grid = new Grid(rows, cols);
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (Math.random() < aliveProbability) {
                    grid.setCell(col, row, 1);
                }
            }
        }
        return grid;
    }
}