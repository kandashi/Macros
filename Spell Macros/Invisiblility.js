let target = canvas.tokens.get(args[1]);
let TokenUpdate = game.macros.getName("TokenUpdate");
let hidden = target.data.hidden
if(args[0] === "on"){
TokenUpdate.execute(args[1],{"hidden": true});
} else {
    TokenUpdate.execute(args[1],{"hidden": false});
}