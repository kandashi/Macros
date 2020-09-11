if(!args[0] ) return ui.notifications.error(`${this.name}'s arguments are invalid.`);

let Off= game.macros.getName(args[0]);
Off.execute("off", token.id);


//useage
let SpellOff = game.macros.getName("SpellOff");
SpellOff.execute("xyz")