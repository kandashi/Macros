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
} else {
    if (target.getFlag('world', 'DE Blinded')) {
        game.macros.getName("BlindExecute").execute("Blinded", args[1], 2 )
    } else if (target.getFlag('world', 'DE Deafened')) {
        game.macros.getName("BlindExecute").execute("Deafened", args[1], 2 )
    }
}

let target = canvas.tokens.get(args[1]);
if (args[2] === 1){
    game.cub.applyCondition(args[0], target)
    let flag = "DE " + args[0]
    target.setFlag('world', flag, 1)
} else {
    if(args[2] === 2){
        console.log("test")
        let flag = "DE " + args[0]
        game.cub.removeCondition(args[0], target);
        target.unsetFlag('world', flag)
    }
}