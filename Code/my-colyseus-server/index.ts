import http from "http";
import path from 'path';
import express from "express";
import cors from "cors";
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";
// import socialRoutes from "@colyseus/social/express"

import { RummyO } from "./rooms/MyRoom";

const port = Number(process.env.PORT || 2567);
const app = express()

app.use(cors());
app.use(express.json())

const gameServer = new Server({
  server: http.createServer(app),
  express: app
});

// register your room handlers
gameServer.define("gameroom", RummyO);

app.use('/', express.static(path.join(__dirname, "static")));

app.use("/colyseus", monitor());

gameServer.listen(port);
console.log(`Listening on ws://localhost:${ port }`)
