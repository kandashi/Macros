///
let target = canvas.tokens.get(args[1]);
let speed = parseInt(target.actor.data.data.attributes.speed.value);
let ActorSetFlag = game.macros.getName("TokenSetFlag");
let ActorUnSetFlag = game.macros.getName("TokenUnSetFlag");
let ActorUpdate = game.macros.getName("ActorUpdate");


if (args[0] === "on") {
    let newSpeed = speed + 10
    ActorSetFlag.execute(target, 'world', 'Longstrider', speed)
    ActorUpdate.execute(target, { "data.attributes.speed.value": (newSpeed + " ft") })
    ChatMessage.create({ content: target.name + " has their speed increased by 10ft" })
} 
if(args[0] === "off") {
    let newSpeed = target.actor.getFlag('world', 'Longstrider');
    ActorUpdate.execute(args[0], { "data.attributes.speed.value": newSpeed });
    ActorUnSetFlag.execute(args[0], 'world', 'Longstrider')
}
///

//updated
let target = canvas.tokens.get(args[1]);
let ActorUpdate = game.macros.getName("ActorUpdate");
let TokenSetFlag = game.macros.getName("ActorSetFlag");
let TokenUnSetFlag = game.macros.getName("ActorUnSetFlag");
let speed = parseInt(target.actor.data.data.attributes.speed.value);

if (args[0] === "on" && !target.actor.getFlag('world', 'Longstrider')) {
    let newSpeed = (speed + 10) + "ft";
    ActorUpdate.execute(args[1], { "data.attributes.speed.value": newSpeed });
    TokenSetFlag.execute(args[1], 'world', 'Longstrider', speed);
    ChatMessage.create({ content: target.name + " has their speed increased by 10ft" })
} else if (args[0] === "off" ) {
    let newSpeed = target.actor.getFlag('world', 'Longstrider')
    ActorUpdate.execute(args[1], { "data.attributes.speed.value": (newSpeed + "ft") });
    TokenUnSetFlag.execute(args[1], 'world', 'Longstrider');
    ChatMessage.create({ content: target.name + " has their speed returned to normal" })
}
