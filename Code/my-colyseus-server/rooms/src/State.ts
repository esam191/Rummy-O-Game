import {Schema, type, MapSchema} from "@colyseus/schema";
import {Tile} from "./Tile";
import {Collection} from "./Collection";
import {Player} from "./Player";

var mynid = require('nid')({length:8});

export class State extends Schema {
    @type({map: Tile})
    board = new MapSchema<Tile>();
    @type({map: Player})
    players = new MapSchema<Player>();
    fullDeck: {[key: string]: Tile}= {};
    
    initalize(){
        let colors: string[] = ["white", "yellow", "blue", "green"];
        let values: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        for (let i = 0; i <colors.length; i++){
            for (let j = 0; j<values.length; j++){
                this.fullDeck[mynid()] = new Tile(0,0,colors[i],values[j]);
                this.fullDeck[mynid()] = new Tile(0,0,colors[i],values[j]);
            }
        }
        // console.log("Initial Tiles: ");
        // console.log(this.fullDeck);
    }
    addToBoard(tile: Tile, key: string){
        this.board[key] = tile;
    }
    updateLocation(key: string, x: number, y: number){
        this.board[key].x = x;
        this.board[key].y = y;
        console.log('updated the location to x = '+ x + " y = "+ y);
    }
    removeFromBoard(key: string){
        delete this.board[key];
    }
    drawTile(height: number, width:number):Tile {
        //Randomly select an existing key.
        let existingkeys = [];
        for (let key in this.fullDeck){
            existingkeys.push(key);
        }
        let x = Math.floor((Math.random() * existingkeys.length));
        let selectedkey = existingkeys[x];
        let tempTile = new Tile (Math.random() *height,Math.random() *width,this.fullDeck[selectedkey].color,this.fullDeck[selectedkey].value);
        delete this.fullDeck[selectedkey];
        return tempTile;
    }

    dealHand(sessionId: string, height: number, width: number){
        for (let i = 0; i<14; i++){
            this.players[sessionId].hand[mynid()] = this.drawTile(height, width);
        }
        // console.log("After Dealing: ")
        // console.log(this.fullDeck);
    }

    //creates new player with session id
    createPlayer(sessionId: string){
        this.players[sessionId] = new Player();
        console.log(sessionId+" joined! Should send an onAdd to client.");

    }
}
