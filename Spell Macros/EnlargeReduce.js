let target = canvas.tokens.get(args[1]);
let originalSize = target.data.width;
let mwak = target.actor.data.data.bonuses.mwak.damage
let ActorUpdate = game.macros.getName("ActorUpdate");
let TokenUpdate = game.macros.getName("TokenUpdate");
let TokenSetFlag = game.macros.getName("ActorSetFlag");
let TokenUnSetFlag = game.macros.getName("ActorUnSetFlag");
if (args[0] === "on" && !target.getFlag('world', 'enlageReduceSpell')) {
    if (target) {
        new Dialog({
            title: "Enlarge or Reduce",
            buttons: {
                one: {
                    label: "Enlarge",
                    callback: () => {
                        let bonus = mwak + " 1d4";
                        let enlarge = (originalSize + 1);
                        ActorUpdate.execute(args[1],{"data.bonuses.mwak.damage" : bonus });
                        TokenUpdate.execute(args[1],{"width": enlarge, "height": enlarge});
                        TokenSetFlag.execute(args[1], 'world', 'enlageReduceSpell', originalSize)
                        ChatMessage.create({content: target.name + " is enlarged"})
                    }
                },
                    two: {
                        label: "Reduce",
                        callback: () => {
                        let bonus = mwak +  " -1d4";
                        let size = originalSize
                        let newSize = (size > 1) ? (size -1) : (size - 0.3)
                        ActorUpdate.execute(args[1],{"data.bonuses.mwak.damage" : bonus });
                        TokenUpdate.execute(args[1],{"width": newSize, "height": newSize});
                        TokenSetFlag.execute(args[1], 'world', 'enlageReduceSpell', originalSize)
                        ChatMessage.create({content: target.name + " is reduced"})
                        }
                },
            }
        }).render(true);
    }
} else if(args[0] === "off" && target.getFlag('world', 'enlageReduceSpell')){
    let newSize = target.getFlag('world', 'enlageReduceSpell')
    ActorUpdate.execute(args[1],{"data.bonuses.mwak.damage" : mwak })
    TokenUpdate.execute(args[1],{"width": newSize, "height": newSize});
    TokenUnSetFlag.execute(args[1], 'world', 'enlageReduceSpell')
    ChatMessage.create({content: target.name + " is returned to normal size"})
}