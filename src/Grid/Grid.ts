type GridCell = 0 | 1

export class Grid {
    private readonly rows: number;
    private readonly cols: number;
    private readonly state: GridCell[][];

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.state = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => 0)
        );
    }

    cell(column: number, row: number): GridCell {
        return this.state[row][column];
    }

    setCell(column: number, row: number, value: GridCell): void {
        this.state[row][column] = value;
    }

    generation(): void {
        const nextState = Array.from({ length: this.rows }, () =>
            Array.from({ length: this.cols }, () => 0)
        ) as GridCell[][]

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const nNeighbors =
                    this.cell((col - 1 + this.cols) % this.cols, (row - 1 + this.rows) % this.rows) +
                    this.cell(col, (row - 1 + this.rows) % this.rows) +
                    this.cell((col + 1) % this.cols, (row - 1 + this.rows) % this.rows) +
                    this.cell((col - 1 + this.cols) % this.cols, row) +
                    this.cell((col + 1) % this.cols, row) +
                    this.cell((col - 1 + this.cols) % this.cols, (row + 1) % this.rows) +
                    this.cell(col, (row + 1) % this.rows) +
                    this.cell((col + 1) % this.cols, (row + 1) % this.rows);

                if (this.cell(col, row) === 1 && (nNeighbors < 2 || nNeighbors > 3)) {
                    nextState[row][col] = 0;
                    continue;
                }
                if (this.cell(col, row) === 0 && nNeighbors === 3) {
                    nextState[row][col] = 1;
                    continue;
                }

                nextState[row][col] = this.cell(col, row);
            }
        }

        this.state.forEach((row, rowIndex) => {
            row.forEach((_, colIndex) => {
                this.state[rowIndex][colIndex] = nextState[rowIndex][colIndex] as GridCell;
            });
        });
    }
}