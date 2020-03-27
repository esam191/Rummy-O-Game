const app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight, backgroundColor: "0x663300"});
const host = window.document.location.host.replace(/:.*/, '');
const client = new Colyseus.Client(location.protocol.replace("http", "ws") + "//" + host + (location.port ? ':' + location.port : ''));
const loader = PIXI.Loader.shared;
const Sprite = PIXI.Sprite;
const resources = PIXI.Loader.shared.resources;
const TextureCache = PIXI.utils.TextureCache;
// code for hand elements
let myhand = [];
let boardTiles = [];
let handDisplay = new PIXI.Container();
let boardDisplay = new PIXI.Container();

client.joinOrCreate("gameroom",{height: window.innerHeight/3-60, width: window.innerWidth-60}).then(room => {
    document.body.appendChild(app.view);
    console.log(room.sessionId);
    room.state.players.onAdd = (player, key) =>{
        // console.log(player);
    }
    room.send("sendHand");
    room.onMessage((message) => {
        // console.log(message);
        if(message.message === "initialHand")
        playerhand = message.data;
        displayHand(message.data);
    });
    console.log(myhand);
    // setting the display
    loader.add("img/spritesheet.json")
        .add("img/hand_bg.jpg")
        .load(setup);

    function setup(){
        // setting up the hand container
        handDisplay.width = window.innerWidth;
        handDisplay.height = window.innerHeight/3;
        handDisplay.y = window.innerHeight - window.innerHeight/3;
        handDisplay.interactiveChildren = true;
        
        let bg = Sprite.from('img/hand_bg.jpg');
        bg.width = window.innerWidth;
        handDisplay.addChild(bg);

        app.stage.addChild(handDisplay);
        myhand.forEach(myFunction);
        function myFunction(item) {
        let testString = item.color+item.value;
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

        

        tile.x = item.x;
        tile.y = item.y;

        //code for making the tile interactive
        
        handDisplay.addChild(tile);

        }
        function onDragStart(event) {
            // store a reference to the data
            // the reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = event.data;
            this.alpha = 0.5;
            this.dragging = true;
        }
        
        function onDragEnd() {
            this.alpha = 1;
            this.dragging = false;
            // set the interaction data to null
            this.data = null;
        }
        
        function onDragMove() {
            if (this.dragging) {
                const newPosition = this.data.getLocalPosition(this.parent);
                this.x = newPosition.x;
                this.y = newPosition.y;
            }
        }
    }
    
    
 });

 function displayHand(playerhand){
    //function to assign player hand tiles
    for (var key in playerhand) {
        if (playerhand.hasOwnProperty(key)) {
            myhand.push(playerhand[key]);
        }
    }
 }
