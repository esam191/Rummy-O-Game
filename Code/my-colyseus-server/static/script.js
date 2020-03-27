const app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight, backgroundColor: "0x663300"});
const host = window.document.location.host.replace(/:.*/, '');
const client = new Colyseus.Client(location.protocol.replace("http", "ws") + "//" + host + (location.port ? ':' + location.port : ''));
const loader = PIXI.Loader.shared;
const Sprite = PIXI.Sprite;
const resources = PIXI.Loader.shared.resources;
const TextureCache = PIXI.utils.TextureCache;
// code for hand elements
let myhand;
let myhistory;
let boardTiles = [];
let handDisplay = new PIXI.Container();
let boardDisplay = new PIXI.Container();
let roominst;
client.joinOrCreate("gameroom",{height: window.innerHeight/3-60, width: window.innerWidth-60}).then(room => {
    roominst = room;
    document.body.appendChild(app.view);
    console.log(room.sessionId);
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
    // setting the display
    loader.add("img/spritesheet.json")
        .add("img/hand_bg.jpg")
        .load(setup);

    function setup(){
        //setting up the board stream
        boardDisplay.width = window.innerWidth;
        boardDisplay.height = 2*window.innerHeight/3;
        boardDisplay.y=0;
        boardDisplay.interactiveChildren = true;

        let bg = Sprite.from('img/test.jpg');
        bg.width = window.innerWidth;
        bg.height = 2*window.innerHeight/3;
        boardDisplay.addChild(bg);
        app.stage.addChild(boardDisplay);
        // setting up the hand container
        handDisplay.width = window.innerWidth;
        handDisplay.height = window.innerHeight/3;
        handDisplay.y = window.innerHeight - window.innerHeight/3;
        handDisplay.interactiveChildren = true;
        
        
        bg = Sprite.from('img/hand_bg.jpg');
        bg.width = window.innerWidth;
        handDisplay.addChild(bg);
        

        app.stage.addChild(handDisplay);
        setupHand();

    }
    room.state.board.onAdd = (tile, key) =>{
        
        boardTiles[key] = tile;
        let name = tile.color+tile.value;
        
        let texture = TextureCache[name];
        
        let stile = new Sprite(texture);
        stile.interactive = true;
        stile.buttonMode = true;
        stile.anchor.set(0.5);
        
        
        stile
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEndBoard)
        .on('pointermove', onDragMove);
        console.log(tile.x +" "+ tile.y)
        stile.y = tile.x;
        stile.x = tile.y;
        stile.uuid = key;
        
        boardDisplay.addChild(stile);
        
        console.log("added child");

    }
    
 });
 

function setupHand(){

    Object.keys(myhand).forEach((key, item)=> {
    let testString = myhand[key].color+myhand[key].value;
    let texture = TextureCache[testString];
    let tile = new Sprite(texture);

    tile.interactive = true;
    tile.buttonMode = true;
    tile.anchor.set(0.5);

    tile
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);
    tile.x = myhand[key].x;
    tile.y = myhand[key].y;
    tile.uuid = key;

    //code for making the tile interactive
    handDisplay.addChild(tile);

    });
    
}
 
function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd(event) {
    
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    if (this.y < 0){
        myhand[this.uuid].x = this.data.getLocalPosition(this.parent).x;
        myhand[this.uuid].y = this.data.getLocalPosition(this.parent).y + boardDisplay.height;
        roominst.send({data: myhand[this.uuid], request: "addToBoard"});
        history[this.uuid] = myhand[this.uuid];
        delete myhand[this.uuid];
        handDisplay.removeChild(this);
    }
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}

function onDragEndBoard(event) {
    
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    
    this.data = null;
}
