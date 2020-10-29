let target = canvas.tokens.get(args[1]);
let ActorUpdate = game.macros.getName("ActorUpdate");
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");
let speed = parseInt(target.actor.data.data.attributes.speed.value);

if (args[0] === "on") {
    let newSpeed = (speed * 2) + "ft";
    ActorUpdate.execute(args[1], { "data.attributes.speed.value": newSpeed });
    ActorSetFlag.execute(args[1], 'world', 'Haste', speed);
    ChatMessage.create({ content: target.name + " has Haste applied" })
}
if (args[0] === "off") {
    if (target.actor.getFlag('world', 'Haste')) {
        let newSpeed = target.actor.getFlag('world', 'Haste')
        ActorUpdate.execute(args[1], { "data.attributes.speed.value": (newSpeed + "ft") });
        ActorUnSetFlag.execute(args[1], 'world', 'Haste');
    DynamicEffects.applyActive("Haste", deactivate, "spell")
    ChatMessage.create({ content: target.name + " has their speed returned to normal" })
    }
} 
