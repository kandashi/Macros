let target = canvas.tokens.get(args[1]);
let speed = parseInt(target.actor.data.data.attributes.speed.value);
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");
let ActorUpdate = game.macros.getName("ActorUpdate");


if (args[0] === "on") {
    let newSpeed = speed - 10
    ActorSetFlag.execute(args[1], 'world', 'rayOfFrost', speed)
    ActorUpdate.execute(args[1], { "data.attributes.speed.value" : (newSpeed + " ft") })
    ChatMessage.create({content: target.name + " has their speed decreased by 10ft"})
} 
if(args[0] === "off") {
    let newSpeed = target.actor.getFlag('world', 'rayOfFrost');
    ActorUpdate.execute(args[1], { "data.attributes.speed.value" : newSpeed });
    ActorUnSetFlag.execute(args[1], 'world', 'rayOfFrost')
}