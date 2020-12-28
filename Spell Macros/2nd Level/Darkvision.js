//DAE Macro Execute, Effect Value = "Macro Name" @target
let target = canvas.tokens.get(args[1]);
let dimVision = target.dimSight;
if (args[0] === "on") {
    target.setFlag('world', 'darkvisionSpell', dimVision);
    target.update({"dimSight" : 60 });
    ChatMessage.Create({content: `${target.name}'s vision has been improved`});
}
if(args[0] === "off") {
    let sight = target.actor.getFlag('world', 'darkvisionSpell');
    target.update({"dimSight" : sight });
    target.unsetFlag('world', 'darkvisionSpell');
    ChatMessage.Create({content: `${target.name}'s vision has been returned`});
}
