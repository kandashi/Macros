let TokenUpdate = game.macros.getName("TokenUpdate");
let target = canvas.tokens.get(args[1]);
if (args[0] === "on") {
    ChatMessage.create({ content: target.name + " is levitated 20ft" })
    TokenUpdate.execute(args[1], { "elevation": 20 });
} else {
    TokenUpdate.execute(args[1], { "elevation": 0 });
    ChatMessage.create({ content: target.name + " is returned to the ground" })
    if (game.modules.get("condition-automation")?.active) {
        ChatMessage.create({content: "test"})
        TokenMagic.deleteFiltersOnSelected("autoShadow");
        TokenMagic.deleteFiltersOnSelected("autoTwist");
        TokenMagic.deleteFiltersOnSelected("autoBulge");
    }
}