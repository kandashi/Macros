//DAE Macro Execute, Effect Value = "Macro Name" @target

let target = canvas.tokens.get(args[1])
if (args[0] === "on") {
    ChatMessage.create({ content: `${target.name} turns invisible` });
    target.update({ "hidden": true });
}
if (args[0] === "off") {
    ChatMessage.create({ content: `${target.name} re-appears` });
    target.update({ "hidden": false });
}
