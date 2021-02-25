//DAE Item Macro Execute, Effect Value = @damage 
//apply @mod damge of none type to the spell
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const target = canvas.tokens.get(lastArg.tokenId)

let mod = args[1];

if (args[0] === "on") {
    ChatMessage.create({ content: `Heroism is applied to ${tactor.name}` })
}
if (args[0] === "off") {
    ChatMessage.create({ content: "Heroism ends" });
}
if(args[0] === "each"){
let bonus = mod > tactor.data.data.attributes.hp.temp ? mod : tactor.data.data.attributes.hp.temp
    tactor.update({ "data.attributes.hp.temp": bonus });
    ChatMessage.create({ content: "Heroism continues on " + tactor.name })
}