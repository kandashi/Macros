let target = canvas.tokens.get(args[1]);
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");

if (args[0] === "on") {
    target.update({hidden : true});
    ActorSetFlag.execute(args[1], 'world','banishment', 1);
    ChatMessage.create({content: target.name + "  was banished"})
    
}
if(args[0]=== "off") {
 target.update({hidden : false})
 ActorUnSetFlag.execute(args[1], 'world', 'banishment');
 ChatMessage.create({content: target.name + "  returned"})
}