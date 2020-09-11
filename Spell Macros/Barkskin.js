let target = canvas.tokens.get(args[1]);
let armour = target.actor.data.data.attributes.ac.value
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");

if (args[0] === "on") {
    let newArmour = armour <= 16 ? 16 : armour
    ActorSetFlag.execute(args[1],'world', 'barkskin', armour)
    target.actor.update({ "data.attributes.ac.value" : newArmour })
    ChatMessage.create({content: target.name + "'s AC is set to 16"})
    
} else {
    let newArmour = target.actor.getFlag('world', 'barkskin');
    target.actor.update({ "data.attributes.ac.value" : newArmour });
    ActorUnSetFlag.execute(args[1], 'world', 'barkskin')
    ChatMessage.create({content: target.name + "'s AC is returned"})
}