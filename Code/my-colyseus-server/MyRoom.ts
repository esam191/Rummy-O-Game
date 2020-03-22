import { Room, Client } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema"

// generic tile class
export class Tile extends Schema{
  @type("number")
  val = -1;
  @type("string")
  color = 'random';
  @type("string")
  type = 'random'
  // two indices for board placement
  @type('int8')
  indexX = -1;
  @type('int8')
  indexY = -1;
}

// player class contains username

export class Player extends Schema{
  // each player has a name and a starting hand
  @type('string')
  name = 'random'
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
    let tileID: string = tile.color+tile.val+tile.type;
    this.boardMelds [tileID] = tile;
  }
  // function to remove a tile from the board
  scratchBoard(tile: Tile){
    let tileID: string = tile.color+tile.val+tile.type;
    delete this.boardMelds[ tileID ];
  }
  // function to draw a random tile from the deck
  drawTile(){
    let randID = this.genRandTileId();
    if(!this.fullDeck[randID]){
      this.drawTile();
    }
    else {
      let targetTile = this.fullDeck[randID];
      delete this.fullDeck[randID];
      return targetTile;
    }
  }
  // function to draw a specific tile from deck
  drawSpecTile(tileID: string){
    
    if(!this.fullDeck[tileID]){
      this.drawTile();
    }
    else {
      let targetTile = this.fullDeck[tileID];
      delete this.fullDeck[tileID];
      return targetTile;
    }
  }

  //function to initialize the deck
  initTileSet(){
    console.log('call init funct success');
    let colors = ["white", "yellow", "blue", "green"];
    let vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let copy = ['a', 'b'];
    let x, y, z;
    for (x = 0; x<colors.length; x++){
      for (y = 0; y<vals.length; y++){
        for (z = 0; z<copy.length; z++){
          let tileID: string = colors[x] + vals[y] + copy[z];
          this.fullDeck[tileID] = new Tile();
          this.fullDeck[tileID].val = vals[y];
          this.fullDeck[tileID].color = colors[x];
          this.fullDeck[tileID].type = copy[z];
        }
      }
    }
  }   
  // function to crate a player 
  createPlayer (id: string, name: string){
    this.players[id] = new Player();
    this.players[id].name = name;
  }
  // a function to generate a random tileID.
  // Tile ID's are unique and therefore can represent every card in the tileset.
  genRandTileId(){
    let colors = ["white", "yellow", "blue", "green"];
    let vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let copy = ['a', 'b'];
    let x, y, z;
    x = Math.floor((Math.random() * colors.length));
    y = Math.floor((Math.random() * vals.length));
    z = Math.floor((Math.random() * copy.length));
    let tileID: string = colors[x] + vals[y] + copy[z];
    return tileID;
  }
}


export class MyRoom extends Room<Board>  {
  //server stuff
  maxClients = 4;
  //when room is created
  onCreate (options: any) {
    console.log('Server instance working. Room Created on Server');
    this.setState(new Board());
    this.state.initTileSet();
    // console.log("random stuff " +this.state.genRandTileId());
    // let temp = this.state.drawTile();
    // console.log(temp.val + temp.color + temp)
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
