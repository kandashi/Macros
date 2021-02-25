//DAE Item Macro
const lastArg = args[args.length - 1];
let tactor;
const target = canvas.tokens.get(lastArg.tokenId)

if (args[0] === "on") {
    ChatMessage.create({ content: `${target.name} is levitated 20ft` });
    target.update({ "elevation": 20 });
}
if (args[0] === "off") {
    target.update({"elevation": 0 });
    ChatMessage.create({ content: `${target.name} is returned to the ground` });
}
