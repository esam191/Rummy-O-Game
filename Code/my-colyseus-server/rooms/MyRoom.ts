import { Room, Client } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema"
import {State} from "./src/State";
import { Tile } from "./src/Tile";
export class RummyO extends Room<State> {
  clientHeight: number= 0;
  clientWidth: number= 0;
  onCreate (options: any) {
    this.setState(new State ());
    this.state.initalize();

  }

  onJoin (client: Client, options: any) {
    this.state.createPlayer(client.sessionId);
    
    this.clientHeight = options.height;
    this.clientWidth = options.width;
    this.state.dealHand(client.sessionId, this.clientHeight, this.clientWidth);
    // console.log(this.state.drawTile());

  }
  onMessage (client: Client, message: any) {
    console.log(message);
    if (message === "sendHand") {
      this.send(client, {data: this.state.players[client.sessionId].hand, message: "initialHand"});
    }
    if (message.request === "addToBoard"){
      let data = message.data;
      let tempTile = new Tile(data.x, data.y, data.color, data.value);
      this.state.addToBoard(tempTile);
      console.log(this.state.board);
    }
    if (message.request === "updateLocation"){
      this.state.updateLocation(message.key, message.ux, message.uy);
    }
    if (message.request === "addBackToHand"){
      this.state.removeFromBoard(message.key);
    }
  }

  onLeave (client: Client, consented: boolean) {
  }

  onDispose() {
  }

}
