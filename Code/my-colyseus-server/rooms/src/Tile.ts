import { Schema, type } from "@colyseus/schema";
export class Tile extends Schema {
    @type('number') x: number;
    @type('number') y: number;
    @type('string') color:string;
    @type('number') value:number;
    constructor (x: number = -1, y: number = -1, color: string, value: number ){
        super();
        this.y = x; 
        this.x = y;
        this.color = color;
        this.value = value;
    }
    
}