const WIDTH = 1200;
const HEIGHT = 800;
const app = new PIXI.Application({width: WIDTH, height: HEIGHT, backgroundColor: "0x663300"});
const host = window.document.location.host.replace(/:.*/, '');
const client = new Colyseus.Client(location.protocol.replace("http", "ws") + "//" + host + (location.port ? ':' + location.port : ''));
const loader = PIXI.Loader.shared;
const Sprite = PIXI.Sprite;
const resources = PIXI.Loader.shared.resources;
const TextureCache = PIXI.utils.TextureCache;
// code for hand elements
let myhand;
let myhistory = [];
let boardSprites = [];
let handSprites = [];
let handDisplay = new PIXI.Container();
let boardDisplay = new PIXI.Container();
let roominst;
let isMyTurn = true;
client.joinOrCreate("gameroom",{height: HEIGHT/3-60, width: WIDTH-60}).then(room => {
    roominst = room;
    document.body.appendChild(app.view);
    room.state.players.onAdd = (player, key) =>{
        console.log(key + "has been added");
    }

    room.send("sendHand");
    room.onMessage((message) => {
        // console.log(message);
        if(message.message === "initialHand")
        console.log(message.data);
        myhand = message.data;
    });
    console.log(myhand);
    // Loading resources into PIXI
    loader.add("img/spritesheet.json")
    .add("img/hand_bg.jpg")
    .load(setup);

    // Setup UI components. 
    function setup(){
        //setting up the board stream
        boardDisplay.width = WIDTH;
        boardDisplay.height = 2*HEIGHT/3;
        boardDisplay.y=0;
        boardDisplay.interactiveChildren = true;
        // board background
        let bg = Sprite.from('img/test.jpg');
        bg.width = WIDTH;
        bg.height = 2*HEIGHT/3;
        boardDisplay.addChild(bg);
        app.stage.addChild(boardDisplay);

        // setting up the hand container
        handDisplay.width = WIDTH;
        handDisplay.height = HEIGHT/3;
        handDisplay.y = 2*HEIGHT/3;
        handDisplay.interactiveChildren = true;
        // hand background
        bg = Sprite.from('img/hand_bg.jpg');
        bg.width = WIDTH;
        handDisplay.addChild(bg);
        app.stage.addChild(handDisplay);
        // Draw and display Player's hand. 
        setupHand();

    }
    room.state.board.onAdd = (tile, key) =>{
        let tilesprite = buildSrpite(tile.color, tile.value, tile.y, tile.x, key, "board");
        boardSprites[key] = tilesprite;
        boardDisplay.addChild(tilesprite);
    }
    room.state.board.onChange = (tile, key) =>{
        
        boardSprites[key].x = tile.x;
        boardSprites[key].y = tile.y;
        let letReturn = false;
        for (const x of myhistory){
            if (x == this.textureName){
                letReturn = true;
            }
        }
        if (tile.y>2*HEIGHT/3 && !letReturn){
            boardSprites[key].y = 2*HEIGHT/3 - 45;
        }
    }
    room.state.board.onRemove = (tile, key) =>{
        boardDisplay.removeChild(boardSprites[key]);
        delete boardSprites[key];
    }
    
 });
 

function setupHand(){
    Object.keys(myhand).forEach((key, item)=> {
    let tile = buildSrpite(myhand[key].color, myhand[key].value , myhand[key].x, myhand[key].y, key, "hand");
    handSprites.push(tile);
    handDisplay.addChild(tile);
    });
}

function addToHand(tile){
    let tilesprite = buildSrpite(tile.color, tile.value, 126, 126, tile.uuid, "hand");
    myhand[tile.uuid] = tile;
    handSprites.push(tilesprite); 
    handDisplay.addChild(tilesprite);
}


// function builds and displays sprite nameed uuid from texture atlas testString at x and y in target container. 
function buildSrpite(color, value, x, y, uuid, target){
    let textureName = color+value;
    if (target === "board"){
        onDragEnd = onDragEndBoard;
    }
    let texture = TextureCache[textureName];
    let tile = new Sprite(texture);
    tile.c = color; 
    tile.v = value;
    tile.interactive = true;
    tile.buttonMode = true;
    tile.anchor.set(0.5);
    tile
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove)
    .on('click', retrieve);
    tile.x = x;
    tile.y = y;
    tile.uuid = uuid;
    tile.loc = target;
    tile.textureName = textureName;
    return tile;
}
// these functions describe the interaction behavior
 
function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}
function retrieve(event){
    let letReturn = false;
        for (const x of myhistory){
            if (x == this.textureName){
                letReturn = true;
            }
        }
    if (this.loc == "board" && letReturn){
        roominst.send({key: this.uuid, request: "addBackToHand"});
        addToHand({color: this.c, value: this.v, uuid: this.uuid});
    }
}

function onDragEnd(event) {
    
    this.alpha = 1;
    this.dragging = false;
    if (this.y < 0){
        myhand[this.uuid].x = this.data.getLocalPosition(this.parent).x;
        myhand[this.uuid].y = this.data.getLocalPosition(this.parent).y + boardDisplay.height;
        roominst.send({data: myhand[this.uuid], request: "addToBoard"});
        myhistory.push(this.textureName);
        delete myhand[this.uuid];
        handDisplay.removeChild(this);
    }
    // Reset the interaction data. 
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;

        if(this.loc == "board"){
            roominst.send({ux: this.x, uy: this.y, key: this.uuid, request: "updateLocation" })
        }
     
        if (this.y < 45 && !isMyTurn && this.loc == "hand"){
            console.log('not my turn');
            this.y = 45;
            this.x = newPosition.x;
            this.onDragEnd;
        }
        

        if (this.loc == "board" && this.y >= 2*HEIGHT/3- 45){
            this.y = 2*HEIGHT/3 - 45;
            this.x = newPosition.x;
            this.onDragEnd;
        }

    }
}

function onDragEndBoard(event) {
    
    this.alpha = 1;
    this.dragging = false;

    // Reset the interaction data. 
    this.data = null;
}
