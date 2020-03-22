import { Room, Client } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema"

// generic tile class
export class Tile extends Schema{
  @type("number")
  val = -1;
  @type("string")
  color = 'random';
  @type(Tile)
  next = new Tile();
}

export class Player extends Schema{
  // each player has a name and a starting hand
  @type('string')
  name = 'random'
  @type({ map: Tile})
  hand = new MapSchema<Tile>();
}


export class Board extends Schema{
  // setting static members to initialize the game board
  // an collection of players
  @type({map: Player})
  players = new MapSchema<Player>();
  
  // full deck of tiles
  @type({map: Tile})
  fullDeck = new MapSchema<Tile>();
  @type({map: Tile})
  boardMelds = new MapSchema<Tile>();

  // function to add to deck  
  appendBoard(tile: Tile){
    // need to remove from hand
  }
  // function to remove a tile from the board
  scratchBoard(tile: Tile){
  }
  // function to remove a tile from the deck
  drawTile(tile: Tile){

  }
  // function to chain tiles
  appendTile(parent: Tile, child: Tile){

    // need to remove from board after appending
    this.scratchBoard(child);
  }
  // function to initialize the deck
  initializeDeck(){
    let colors = ["white", "yellow", "blue", "green"];
    let vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let x, y; 
    for (x in colors){
      for (y in vals){
        // need to generate a unique id for each tile and add to deck
      }
    }
    console.log('deck initialized');
  }
  
  createPlayer (id: string, name: string){
  }
}


export class MyRoom extends Room<Board>  {
  //server stuff
  maxClients = 4;

  onCreate (options: any) {
    console.log('Server instance working. Room Created on Server');
    this.setState(new Board());
  }

  onJoin (client: Client, options: any) {
    console.log(client.id + 'joined!');
  }

  onMessage (client: Client, message: any) {
  }

  onLeave (client: Client, consented: boolean) {
  }

  onDispose() {
  }

}
