const loader = PIXI.Loader.shared;
const resources = PIXI.Application.resources;
let app = new PIXI.Application({
    width: window.innerWidth, 
    height: window.innerHeight
});
let handZone = new PIXI.Container();
app.renderer.backgroundColor = 0x061639;
// loader
//   .add([
//     "img/hand_bg.jpg", 
//     "img/tiles/Letter_Blocks_01_Set_4_A_64x64.png", 
//     "img/tiles/Number_Blocks_01_Set_2_64x64_2.png",   
//     "img/tiles/Number_Blocks_01_Set_3_64x64_7.png", 
//     "img/tiles/Letter_Blocks_01_Set_4_J_64x64.png",
//     "img/tiles/Number_Blocks_01_Set_2_64x64_3.png",
//     "img/tiles/Number_Blocks_01_Set_3_64x64_8.png",
//     "img/tiles/Letter_Blocks_01_Set_1_A_64x64.png",
//     "img/tiles/Letter_Blocks_01_Set_4_K_64x64.png",
//     "img/tiles/Number_Blocks_01_Set_2_64x64_4.png",
//     "img/tiles/Number_Blocks_01_Set_3_64x64_9.png",
//     "img/tiles/Letter_Blocks_01_Set_1_J_64x64.png",
//     "img/tiles/Letter_Blocks_01_Set_4_Q_64x64.png",
//     "img/tiles/Number_Blocks_01_Set_2_64x64_5.png",
//     "img/tiles/Number_Blocks_01_Set_4_64x64_1.png",
//     "img/tiles/Letter_Blocks_01_Set_1_K_64x64.png",
//     "img/tiles/Number_Blocks_01_Set_1_64x64_1.png",
//     "img/tiles/Number_Blocks_01_Set_2_64x64_6.png",
//     "img/tiles/Number_Blocks_01_Set_4_64x64_2.png",
//     "img/tiles/Letter_Blocks_01_Set_1_Q_64x64.png",
//     "img/tiles/Number_Blocks_01_Set_1_64x64_2.png",
//     "img/tiles/Number_Blocks_01_Set_2_64x64_7.png",
//     "img/tiles/Number_Blocks_01_Set_4_64x64_3.png",
//     "img/tiles/Letter_Blocks_01_Set_2_A_64x64.png",
//     "img/tiles/Number_Blocks_01_Set_1_64x64_3.png",
//     "img/tiles/Number_Blocks_01_Set_2_64x64_8.png",
//     "img/tiles/Number_Blocks_01_Set_4_64x64_4.png",
//     "img/tiles/Letter_Blocks_01_Set_2_J_64x64.png",
//     "img/tiles/Number_Blocks_01_Set_1_64x64_4.png",
//     "img/tiles/Number_Blocks_01_Set_2_64x64_9.png",
//     "img/tiles/Number_Blocks_01_Set_4_64x64_5.png",
//     "img/tiles/Letter_Blocks_01_Set_2_K_64x64.png",
//     "img/tiles/Number_Blocks_01_Set_1_64x64_5.png",
//     "img/tiles/Number_Blocks_01_Set_3_64x64_1.png",
//     "img/tiles/Number_Blocks_01_Set_4_64x64_6.png",
//     "img/tiles/Letter_Blocks_01_Set_2_Q_64x64.png",
//     "img/tiles/Number_Blocks_01_Set_1_64x64_6.png",
//     "img/tiles/Number_Blocks_01_Set_3_64x64_2.png",
//     "img/tiles/Number_Blocks_01_Set_4_64x64_7.png",
//     "img/tiles/Letter_Blocks_01_Set_3_A_64x64.png",
//     "img/tiles/Number_Blocks_01_Set_1_64x64_7.png",
//     "img/tiles/Number_Blocks_01_Set_3_64x64_3.png",
//     "img/tiles/Number_Blocks_01_Set_4_64x64_8.png",
//     "img/tiles/Letter_Blocks_01_Set_3_J_64x64.png",
//     "img/tiles/Number_Blocks_01_Set_1_64x64_8.png",
//     "img/tiles/Number_Blocks_01_Set_3_64x64_4.png",
//     "img/tiles/Number_Blocks_01_Set_4_64x64_9.png",
//     "img/tiles/Letter_Blocks_01_Set_3_K_64x64.png",
//     "img/tiles/Number_Blocks_01_Set_1_64x64_9.png",
//     "img/tiles/Number_Blocks_01_Set_3_64x64_5.png",
//     "img/tiles/Number_Blocks_01_Set_5_64x64_0.png",
//     "img/tiles/Letter_Blocks_01_Set_3_Q_64x64.png",
//     "img/tiles/Number_Blocks_01_Set_2_64x64_1.png",
//     "img/tiles/Number_Blocks_01_Set_3_64x64_6.png"
//     ])

//     .load(setup);
//     function setup(){
//         let dock = new Sprite(resources["img/hand_bg.jpg"].texture);
//         app.stage.addChild(dock);
//     }
// let t = new Tink(PIXI, renderer.view);


document.body.appendChild(app.view);

var host = window.document.location.host.replace(/:.*/, '');
var client = new Colyseus.Client(location.protocol.replace("http", "ws") + "//" + host + (location.port ? ':'+location.port : ''));
client.joinOrCreate("gameroom").then(room => {
    //changes to client
    console.log('Attemp join')
});