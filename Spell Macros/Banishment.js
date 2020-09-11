let target = canvas.tokens.get(args[1]);
let ActorSetFlag = game.macros.getName("TokenSetFlag");
let ActorUnSetFlag = game.macros.getName("TokenUnSetFlag");

if (args[0] === "on") {
    target.update({hidden : true});
    ActorSetFlag.execute(target, 'world','banishment', 1);
    ChatMessage.create({content: target.name + "  was banished"})
    
}
if(args[0]=== "off") {
 target.update({hidden : false})
 ActorUnSetFlag.execute(target, 'world', 'banishment');
 ChatMessage.create({content: target.name + "  returned"})
}