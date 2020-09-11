let target = canvas.tokens.get(args[1]);

if (args[0] === "on") {
    new Dialog({
        title: "Choose an Effect",
        buttons: {
            one: {
                label: "Blindness",
                callback: () => {
                    game.cub.applyCondition("Blinded", target)
                    target.setFlag('world', 'DE Blinded', 1)
                }
            },
            two: {
                label: "Deafness",
                callback: () => {
                    game.cub.applyCondition("Deafened", target)
                    target.setFlag('world', 'DE Deafened', 1)
                }
            }
        },
    }).render(true);
} else {
    if (target.getFlag('world', 'DE Blinded')) {
        game.cub.removeCondition("Blinded", target);
        target.unsetFlag('world', 'DE Blinded')
    } else if (target.getFlag('world', 'DE Deafened')) {
        game.cub.removeCondition("Deafened", target);
        target.unsetFlag('world', 'DE Deafened')
    }
}

//new
let target = canvas.tokens.get(args[1]);
if (args[0] === "on") {
    new Dialog({
        title: "Choose an Effect",
        buttons: {
            one: {
                label: "Blindness",
                callback: () => {
                    game.macros.getName("BlindExecute").execute("Blinded", args[1], 1 )
                }
            },
            two: {
                label: "Deafness",
                callback: () => {
                    game.macros.getName("BlindExecute").execute("Deafened", args[1], 1 )
                }
            }
        },
    }).render(true);
}
if(args[0] === "off"){
    if (target.getFlag('world', 'DE Blinded')) {
        game.macros.getName("BlindExecute").execute("Blinded", args[1], 2 )
    } else if (target.getFlag('world', 'DE Deafened')) {
        game.macros.getName("BlindExecute").execute("Deafened", args[1], 2 )
    }
}

//BlindeExectue macro
let target = canvas.tokens.get(args[1]);
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");


if (args[2] === 1){
    game.cub.applyCondition(args[0], target)
    let flag = "DE " + args[0]
    ActorSetFlag.execute(args[1], 'world', flag, 1)
    ChatMessage.Create({content: target.name + " has been " + args[0]})
} else {
    if(args[2] === 2){
        let flag = "DE " + args[0]
        game.cub.removeCondition(args[0], target);
        ChatMessage.Create({content: target.name + " is no longer " + args[0]})
        ActorUnSetFlag.execute(args[1], 'world', flag)
    }
}