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
  @type('int8')
  numPlayers = 0;
  @type({map: Player})
  players = new MapSchema<Player>();
  
  // full deck of tiles
  @type({map: Tile})
  fullDeck = new MapSchema<Tile>();

  @type({map: Tile})
  boardMelds = new MapSchema<Tile>();
  // initializing player hands
  @type({map: Tile})
  hand1 = new MapSchema<Tile>();
  @type({map: Tile})
  hand2 = new MapSchema<Tile>();
  @type({map: Tile})
  hand3 = new MapSchema<Tile>();
  @type({map: Tile})
  hand4 = new MapSchema<Tile>();

  
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
  // function to draw a random tile from the deck (nneds edit)
  drawTile(){
    let randID = this.genRandTileId();
    // console.log("tyring "+ randID);
    if (this.fullDeck[randID]) {
      // console.log("found the new one");
      let targetTile = this.fullDeck[randID];
      delete this.fullDeck[randID];
      // console.log("returned");
      return targetTile;
    }
    else return null;
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
  testDeck = new MapSchema<Tile>();
  //when room is created
  onCreate (options: any) {
    // console.log('Server instance working. Room Created on Server');
    this.setState(new Board());
    this.state.initTileSet();
    // console.log("random stuff " +this.state.genRandTileId());
    // let temp = this.state.drawTile();
    // console.log(temp.val + temp.color + temp)

  }

  onJoin (client: Client, options: any) {
    // pick 14 tiles and hand them to player 
    this.state.createPlayer(client.sessionId, "testuser");
    this.state.numPlayers++;
    // let tile = this.state.drawTile();
    // console.log(tile.color + tile.val);
    let tile :Tile;
    let drawncards = 0;
    const initDrawLimit = 14;

    switch(this.state.numPlayers){

      case 1: {
        while(drawncards != initDrawLimit){
          tile = this.state.drawTile();
          if (tile){
            let indexname = tile.color+tile.val+tile.type;
            this.state.hand1[indexname]= new Tile();
            this.state.hand1[indexname].val = tile.val;
            this.state.hand1[indexname].color = tile.color;
            this.state.hand1[indexname].type = tile.type;
          drawncards++;
          }
        }
        console.log("player 1 joined");
      break;
      }
      case 2: {
        drawncards = 0;
        while(drawncards != initDrawLimit){
          tile = this.state.drawTile();
          if (tile){
            let indexname = tile.color+tile.val+tile.type;
            this.state.hand2[indexname]= new Tile();
            this.state.hand2[indexname].val = tile.val;
            this.state.hand2[indexname].color = tile.color;
            this.state.hand2[indexname].type = tile.type;
          drawncards++;
          }
        }
        console.log("player 2 joined");
      break;
      }
      case 3: {
        drawncards = 0; 
        while(drawncards != initDrawLimit){
          tile = this.state.drawTile();
          if (tile){
            let indexname = tile.color+tile.val+tile.type;
            this.state.hand3[indexname]= new Tile();
            this.state.hand3[indexname].val = tile.val;
            this.state.hand3[indexname].color = tile.color;
            this.state.hand3[indexname].type = tile.type;
          drawncards++;
          }
        }
        console.log("player 3 joined");
      break;
      }
      case 4: {
        drawncards = 0; 
        while(drawncards != initDrawLimit){
          tile = this.state.drawTile();
          if (tile){
            let indexname = tile.color+tile.val+tile.type;
            this.state.hand4[indexname]= new Tile();
            this.state.hand4[indexname].val = tile.val;
            this.state.hand4[indexname].color = tile.color;
            this.state.hand4[indexname].type = tile.type;
          drawncards++;
          }
        }
        console.log("player 4 joined");
      break;
      }
    }
  }

  onMessage (client: Client, message: any) {
  }

  onLeave (client: Client, consented: boolean) {
  }

  onDispose() {
  }

}
