const loader = PIXI.Loader.shared;
const resources = PIXI.Loader.shared.resources;
const Sprite = PIXI.Sprite;
const TextureCache = PIXI.utils.TextureCache;



var host = window.document.location.host.replace(/:.*/, '');
var client = new Colyseus.Client(location.protocol.replace("http", "ws") + "//" + host + (location.port ? ':'+location.port : ''));
client.joinOrCreate("gameroom").then(room => {
    // creating the game instance
    let app = new PIXI.Application({
        width: window.innerWidth, 
        height: window.innerHeight
    });
    // hand container
    let handDisplay = new PIXI.Container();

    document.body.appendChild(app.view);
    // background color
    app.renderer.backgroundColor = 0x061639;
    
    loader.add("img/spritesheet.json")
        .add("img/hand_bg.jpg")
        .load(setup);

    function setup(){
        // setting up the hand container
        handDisplay.width = window.innerWidth;
        handDisplay.height = window.innerHeight/3;
        handDisplay.y = window.innerHeight - window.innerHeight/3;
        handDisplay.interactiveChildren = false;
        let bg = Sprite.from('img/hand_bg.jpg');
        bg.width = window.innerWidth;
        handDisplay.addChild(bg);

        app.stage.addChild(handDisplay);
        let testString = "white2";
        let texture = TextureCache[testString];
        let tile = new Sprite(texture);
        handDisplay.addChild(tile);
        
    }






});