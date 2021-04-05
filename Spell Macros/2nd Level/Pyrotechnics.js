//DAE Item Macro Execute, no arguments passed

const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const target = canvas.tokens.get(lastArg.tokenId)

if (args[0] === "on") {
    new Dialog({
        title: "Choose an Effect",
        buttons: {
            one: {
                label: "Fireworks",
                callback: async () => {
                    let save = await tactor.rollAbilitySave("con");
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
