
let app = new PIXI.Application({
    width: window.innerWidth, 
    height: window.innerHeight
});
document.body.appendChild(app.view);

var host = window.document.location.host.replace(/:.*/, '');
var client = new Colyseus.Client(location.protocol.replace("http", "ws") + "//" + host + (location.port ? ':'+location.port : ''));
client.joinOrCreate("gameroom").then(room => {
    //changes to client
    console.log('Attemp join')
});