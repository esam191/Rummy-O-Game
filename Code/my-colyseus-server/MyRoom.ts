import { Room, Client } from "colyseus";

export class MyRoom extends Room {
  //server stuff

  onCreate (options: any) {
    console.log('created');
  }

  onJoin (client: Client, options: any) {
  }

  onMessage (client: Client, message: any) {
  }

  onLeave (client: Client, consented: boolean) {
  }

  onDispose() {
  }

}
