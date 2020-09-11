let TokenUpdate = game.macros.getName("TokenUpdate");
if (args[0] === "on") {
    ChatMessage.create({ content: "hello" })
    TokenUpdate.execute(args[1], { "hidden": true });
} else {
    TokenUpdate.execute(args[1], { "hidden": false });
}