

if (args[0] === "on") {
    const lastArg = args[args.length - 1];
    let tactor;
    if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
    else tactor = game.actors.get(lastArg.actorId);
    const target = canvas.tokens.get(lastArg.tokenId)
    const DAEitem = lastArg.efData.flags.dae.itemData
    const saveData = DAEitem.data.save
    const flavor = `${CONFIG.DND5E.abilities["dex"]} DC${args[1]} ${DAEitem?.name || ""}`;
    let saveRoll = (await tactor.rollAbilitySave("dex", { flavor })).total;
    if (saveRoll < args[1]) {
        game.cub.addCondition("Prone", target)
    }
}

else if (args[0] === "each") {

    const lastArg = args[args.length - 1];
    let tactor;
    if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
    else tactor = game.actors.get(lastArg.actorId);
    const target = canvas.tokens.get(lastArg.tokenId)
    const DAEitem = lastArg.efData.flags.dae.itemData
    const saveData = DAEitem.data.save
    const flavor = `${CONFIG.DND5E.abilities["dex"]} DC${args[1]} ${DAEitem?.name || ""}`;
let saveRoll = (await tactor.rollAbilitySave("dex", { flavor })).total;
    if (saveRoll < args[1]) {
        game.cub.addCondition("Prone", target)
    }
}
