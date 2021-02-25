//DAE Item Macro
const lastArg = args[args.length - 1];
const target = canvas.tokens.get(lastArg.tokenId)


if (args[0] === "on") {
    ChatMessage.create({ content: `${target.name} turns invisible` });
    target.update({ "hidden": true });
}
if (args[0] === "off") {
    ChatMessage.create({ content: `${target.name} re-appears` });
    target.update({ "hidden": false });
}