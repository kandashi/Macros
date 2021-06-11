if(!game.modules.get("advanced-macros")?.active) {ui.notifications.error("Please enable the Advanced Macros module") ;return;}
//DAE Macro, Effect Value = @target

let target = canvas.tokens.get(args[1]); //find target

if (args[0] === "on") {
    target.update({hidden : true}); // hide targeted token
    ChatMessage.create({content: target.name + "  was banished"});
    
}
if(args[0]=== "off") {
 target.update({hidden : false}); // unhide token
 ChatMessage.create({content: target.name + "  returned"});
}
