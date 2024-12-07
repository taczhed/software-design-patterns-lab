import * as P5 from "p5";
import { Config } from "../Config/Config";

const config = Config.instance;

class Button {
    private label: string;
    private readonly x: number;
    private readonly y: number;
    private readonly width: number;
    private readonly height: number;
    private readonly color: number[];
    private readonly textColor: number[];

    constructor(builder: ButtonBuilder) {
        this.label = builder.label;
        this.x = builder.x;
        this.y = builder.y;
        this.width = builder.width;
        this.height = builder.height;
        this.color = builder.color;
        this.textColor = builder.textColor;
    }

    draw(p: P5) {
        p.fill(this.color);
        p.rect(this.x, this.y, this.width, this.height);
        p.fill(this.textColor);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(18);
        p.text(this.label, this.x + this.width / 2, this.y + this.height / 2);
    }

    isClicked(mouseX: number, mouseY: number): boolean {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    setLabel(label: string): void {
        this.label = label;
    }
}

// ButtonBuilder class as Builder example
export class ButtonBuilder {
    label: string = "Button";
    x: number = config.toggleButtonX;
    y: number = config.toggleButtonY;
    width: number = config.buttonWidth;
    height: number = config.buttonHeight;
    color: number[] = config.colors.green;
    textColor: number[] = config.colors.black;

    setPosition(x: number, y: number): this {
        this.x = x;
        this.y = y;
        return this;
    }

    setSize(width: number, height: number): this {
        this.width = width;
        this.height = height;
        return this;
    }

    setLabel(label: string): this {
        this.label = label;
        return this;
    }

    setColor(color: number[]): this {
        this.color = color;
        return this;
    }

    setTextColor(textColor: number[]): this {
        this.textColor = textColor;
        return this;
    }

    build(): Button {
        return new Button(this);
    }
}