import { Schema, type, MapSchema} from "@colyseus/schema"
import { Tile } from "./Tile";

export class Collection extends Schema{
    @type({map: Tile})
    set = new MapSchema<Tile>();
    score:number = 0; 
    
}
