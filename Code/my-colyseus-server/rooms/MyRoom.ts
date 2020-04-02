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
      let wherex = message.wherex;
      let wherey = message.wherey;
      let tempTile = new Tile(wherex, wherey, data.color, data.value);
      this.state.addToBoard(tempTile, message.key);
      console.log(this.state.board);
      delete this.state.players[client.sessionId].hand[message.key];
      // console.log(this.state.players[client.sessionId].hand)
    }
    if (message.request === "updateLocation"){
      this.state.updateLocation(message.key, message.ux, message.uy);
    }
    if (message.request === "addBackToHand"){
      let color = message.color;
      let value = message.value;
      let wherex = message.wherex;
      let wherey = message.wherey;
      let tempTile = new Tile(wherex, wherey, color, value);
      this.state.players[client.sessionId].hand[message.key] = tempTile;
      this.state.removeFromBoard(message.key);
      this.send(client, {data: this.state.players[client.sessionId].hand[message.key], key: message.key, message: "add"});
      console.log(this.state.players[client.sessionId].hand);
    }
  }

  onLeave (client: Client, consented: boolean) {

  }

  onDispose() {
  }

}
