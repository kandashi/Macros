//args[0] = token ID
//args[1]-[3] = update data

if(!args[0] || !args[1]) return ui.notifications.error(`${this.name}'s arguments are invalid.`);

canvas.tokens.get(args[0]).actor.setFlag(args[1], args[2], args[3]);



//usage
let ActorSetFlag = game.macros.getName("ActorSetFlag");
ActorSetFlag.execute(target.id, scope, key, value);