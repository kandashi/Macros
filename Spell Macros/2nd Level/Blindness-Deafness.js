//DAE Item Macro 
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
let target = canvas.tokens.get(lastArg.tokenId)
const DAEitem = lastArg.efData.flags.dae.itemData
const saveData = DAEitem.data.save

if (args[0] === "on") {
    new Dialog({
        title: "Choose an Effect",
        buttons: {
            one: {
                label: "Blindness",
                callback: () => {
                    DAE.setFlag(tactor, "DAEBlind", "blind")
                    game.cub.addCondition("Blinded", target)
                }
            },
            two: {
                label: "Deafness",
                callback: () => {
                    DAE.setFlag(tactor, "DAEBlind", "deaf")
                    game.cub.addCondition("Deafened", target)
                }
            }
        },
    }).render(true);
}
if (args[0] === "off") {
    let flag = DAE.getFlag(tactor, "DAEBlind")
    if (flag === "blind") {
        game.cub.removeCondition("Blinded", target)
    } else if (flag === "deaf") {
        game.cub.removeCondition("Deafened", target)
    }
    DAE.unsetFlag(tactor, "DAEBlind")
}

if (args[0] === "each") {
    const flavor = `${CONFIG.DND5E.abilities[saveData.ability]} DC${saveData.dc} ${DAEitem?.name || ""}`;
    let saveRoll = (await tactor.rollAbilitySave(saveData.ability, { flavor })).total;
    if (saveRoll >= saveData.dc) tactor.deleteEmbeddedEntity("ActiveEffect", lastArg.effectId);
}