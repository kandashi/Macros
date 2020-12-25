//DAE Macro Execute, Effect Value = "Macro Name" @target 

let target = canvas.tokens.get(args[1]);

if (args[0] === "on") {
    new Dialog({
        title: "Choose an Effect",
        buttons: {
            one: {
                label: "Fireworks",
                callback: async () => {
                    let save = await target.actor.rollAbilitySave("con");
                    debugger;
                    if (save.total < args[2]) {
                        game.cub.addCondition("Blinded", target);
                    }
                }
            },
            two: {
                label: "Smoke",
                callback: () => {
                }
            }
        },
    }).render(true);
};

if (args[0] === "off") {
    if (game.cub.hasCondition("Blinded", target)) {
        game.cub.removeCondition("Blinded", target);
    }
};