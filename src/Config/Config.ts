// Config class as Singleton example
export class Config {
    static #instance: Config;

    public readonly width: number;
    public readonly height: number;
    public readonly nCellsX: number;
    public readonly nCellsY: number;
    public readonly cellWidth: number;
    public readonly cellHeight: number;

    public readonly buttonWidth: number;
    public readonly buttonHeight: number;
    public readonly buttonX: number;
    public readonly buttonY: number;

    public readonly colors: { white: number[]; black: number[]; gray: number[]; green: number[] };

    private constructor() {

        // Grid dimensions and simulation settings
        this.width = 800;
        this.height = 600;
        this.nCellsX = 40;
        this.nCellsY = 30;
        this.cellWidth = this.width / this.nCellsX;
        this.cellHeight = this.height / this.nCellsY;

        // Colors
        this.colors = {
            white: [255, 255, 255],
            black: [0, 0, 0],
            gray: [128, 128, 128],
            green: [0, 255, 0],
        };

        // Button dimensions
        this.buttonWidth = 200;
        this.buttonHeight = 50;
        this.buttonX = (this.width - this.buttonWidth) / 2;
        this.buttonY = this.height - this.buttonHeight - 10;
    }

    // Get the single instance of Config
    public static get instance(): Config {
        if (!Config.#instance) {
            Config.#instance = new Config();
        }
        return Config.#instance;
    }
}