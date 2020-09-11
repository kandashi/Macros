let target = canvas.tokens.get(args[1]);
let TokenUpdate = game.macros.getName("TokenUpdate");
let hidden = target.data.hidden;
let visible = hidden ? false : true;
TokenUpdate.execute(args[1],{"hidden": visible});
