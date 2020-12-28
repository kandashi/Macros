//DAE Macro Execute, Effect Value = "Macro Name" @target

let target = canvas.tokens.get(args[1]);

if (args[0] === "on") {
    ChatMessage.create({ content: `${target.name} is levitated 20ft` });
    TokenUpdate.execute(args[1], { "elevation": 20 });
}
if (args[0] === "off") {
    TokenUpdate.execute(args[1], { "elevation": 0 });
    ChatMessage.create({ content: `${target.name} is returned to the ground` });
}
