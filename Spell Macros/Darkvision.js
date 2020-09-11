let target = canvas.tokens.get(args[1]);
let dimVision = target.dimSight
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");
let ActorUpdate = game.macros.getName("ActorUpdate");


if (args[0] === "on") {
    ActorSetFlag.execute(args[1], 'world', 'darkvisionSpell', dimVision)
    ActorUpdate.execute(args[1],{ "dimSight" : 60 })
    ChatMessage.Create({content: target.name + "'s vision has been improve"})
}
if(args[0] === "off") {
    let sight = target.getFlag('world', 'darkvisionSpell');
    ActorUpdate.execute(args[1],{ "dimSight" : sight });
    ActorUnSetFlag.execute(args[1], 'world', 'darkvisionSpell')
    ChatMessage.Create({content: target.name + "'s vision has been improved"})
}