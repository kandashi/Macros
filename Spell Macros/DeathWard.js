let target = canvas.tokens.get(args[1]);
let armour = target.actor.data.data.attributes.ac.value
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");

if (args[0] === "on") {
    if(armour < 16)
    ActorSetFlag.execute(args[1], 'world', 'barkskin', 1)
    DynamicEffects.togglePassive("Barkskin", spell)
    ChatMessage.create({content: target.name + "'s AC is increased to 16"})
    
} 
if(args[0] === "off") {
    DynamicEffects.togglePassive("Barkskin", spell)
    ActorUnSetFlag.execute(args[1], 'world', 'barkskin')
    ChatMessage.create({content: target.name + "'s AC is returned"})
}