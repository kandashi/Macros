//args[0] = token ID
//args[1]-[3] = update data

if(!args[0] || !args[1]) return ui.notifications.error(`${this.name}'s arguments are invalid.`);

canvas.tokens.get(args[0]).actor.unsetFlag(args[1], args[2]);



//usage
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");
ActorUnSetFlag.execute(target.id, scope, key);