let target = canvas.tokens.get(args[1]);
let ActorUpdate = game.macros.getName("ActorUpdate");
let TokenSetFlag = game.macros.getName("TokenSetFlag");
let TokenUnSetFlag = game.macros.getName("TokenUnSetFlag");
let speed = parseInt(target.actor.data.data.attributes.speed.value);

if (!target.getFlag('world', 'bootsOfStriding')) {
    let newSpeed = (speed < 30) ? 30 : speed;
    console.log(newSpeed)
    ActorUpdate.execute(args[1], { "data.attributes.speed.value": (newSpeed + "ft") });
    TokenSetFlag.execute(args[1], 'world', 'bootsOfStriding', speed);
} else if (target.getFlag('world', 'bootsOfStriding')) {
    let newSpeed = target.getFlag('world', 'bootsOfStriding')
    ActorUpdate.execute(args[1], { "data.attributes.speed.value": (newSpeed + "ft") });
    TokenUnSetFlag.execute(args[1], 'world', 'bootsOfStriding');
}
