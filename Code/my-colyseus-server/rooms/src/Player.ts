import {Schema, type, MapSchema} from "@colyseus/schema";
import {Tile} from "./Tile";
export class Player extends Schema{
    @type('boolean')
    what = false;
    hand: {[key: string]: Tile} = {};
}