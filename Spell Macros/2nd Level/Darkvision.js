//DAE macro, no arguments to pass
const lastArg = args[args.length - 1];
let tactor;
const target = canvas.tokens.get(lastArg.tokenId)
if (lastArg.tokenId) tactor = target.actor;
else tactor = game.actors.get(lastArg.actorId);

let dimVision = target.data.dimSight;
if (args[0] === "on") {
    DAE.setFlag(tactor, 'darkvisionSpell', dimVision);
    target.update({"dimSight" : 60 });
    ChatMessage.create({content: `${target.name}'s vision has been improved`});
}
if(args[0] === "off") {
    let sight = DAE.getFlag(tactor, 'darkvisionSpell');
    target.update({"dimSight" : sight });
    DAE.unsetFlag(tactor, 'darkvisionSpell');
    ChatMessage.create({content: `${target.name}'s vision has been returned`});
}