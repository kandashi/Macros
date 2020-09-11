let target = canvas.tokens.get(args[1]);
let ActorUpdate = game.macros.getName("ActorUpdate");
let TokenSetFlag = game.macros.getName("TokenSetFlag");
let TokenUnSetFlag = game.macros.getName("TokenUnSetFlag");
let speed = parseInt(target.actor.data.data.attributes.speed.value);

if (!target.getFlag('world', 'bootsOfSpeed')) {
    let newSpeed = (speed * 2) + "ft";
    ActorUpdate.execute(args[1], {"data.attributes.speed.value": newSpeed});
    ActorSetFlag.execute(args[1], 'world', 'bootsOfSpeed', speed);
} else {
    let newSpeed = target.getFlag('world', 'bootsOfSpeed')
    ActorUpdate.execute(args[1],{"data.attributes.speed.value": (newSpeed + "ft")});
    ActorUnSetFlag.execute(args[1],'world', 'bootsOfSpeed');
}
