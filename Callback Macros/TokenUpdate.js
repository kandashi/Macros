//args[0] = token ID
//args[1] = update data

if(!args[0] || !args[1]) return ui.notifications.error(`${this.name}'s arguments are invalid.`);

canvas.tokens.get(args[0]).update(args[1]);



//usage
let TokenUpdate = game.macros.getName("TokenUpdate");
 TokenUpdate.execute(target.id,{XYZ});