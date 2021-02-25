//DAE Item Macro

const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);


/**
 * For each target select the effect (GM selection)
 */
if (args[0] === "on") {
    new Dialog({
        title: "Choose enhance ability effect for " + tactor.name,
        buttons: {
            one: {
                label: "Bear's Endurance",
                callback: () => {
                    let formula = `2d6`;
                    let amount = new Roll(formula).roll().total;
                    DAE.setFlag(tactor, 'enhanceAbility', {
                        name: "bear",
                    });
                    ChatMessage.create({ content: `${tactor.name} gains ${amount} temp Hp` });
                    tactor.update({ "data.attributes.hp.temp": amount });

                }
            },
            two: {
                label: "Bull's Strength",
                callback: () => {
                    ChatMessage.create({ content: `${tactor.name}'s encumberance is doubled` });
                    DAE.setFlag(tactor, 'enhanceAbility', {
                        name: "bull",
                    });
                    tactor.setFlag('dnd5e', 'powerfulBuild', true);
                }
            },
            three: {
                label: "Other",
                callback: () => {
                    DAE.setFlag(tactor, 'enhanceAbility', {
                        name: "other",
                    });
                    ChatMessage.create({ content: `A non automated Ability was enhanced for ${tactor.name}`});
                }
            }
        }
    }).render(true);
}

if (args[0] === "off") {
    let flag = DAE.getFlag(tactor, 'enhanceAbility');
    if (flag.name === "bull") tactor.unsetFlag('dnd5e', 'powerfulBuild', false);
    DAE.unsetFlag(tactor, 'enhanceAbility');
    ChatMessage.create({ content: "Enhance Ability has expired" });
}