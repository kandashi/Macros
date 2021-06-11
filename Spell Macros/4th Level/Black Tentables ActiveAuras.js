if (!game.modules.get("advanced-macros")?.active) ui.notifications.error("Advanced Macros is not enabled")
if (!game.modules.get("combat-utility-belt")?.active) ui.notifications.error("CUB is not enabled")
if (!game.modules.get("times-up")?.active) ui.notifications.error(" Times up is not enabled")
if (args[0] === "on" || args[0] === "each") {
    const lastArg = args[args.length - 1];
    let tactor;
    if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
    else tactor = game.actors.get(lastArg.actorId);
    const target = canvas.tokens.get(lastArg.tokenId)
    const flavor = `${CONFIG.DND5E.abilities["dex"]} DC${args[1]} "Black Tentacles"}`;
    let res = game.cub.hasCondition("Restrained")
    if (!res) {
        var saveRoll = (await tactor.rollAbilitySave("con", { flavor }))?.total;
        if (!saveRoll) return;
    }
    else if (res) {
        var saveRoll = 0
    }
    let damageRoll = new Roll(`3d6`).roll()
    game.dice3d?.showForRoll(damageRoll)
    let targets = new Set();
    let saves = new Set();
    targets.add(target);
    saves.add(target);
    if (saveRoll > args[1]) {
        saves.add(target)
        MidiQOL.applyTokenDamage([{ damage: damageRoll.total/2, type: "bludgeoning" }], damageRoll.total, targets, null, saves);
        if(!res)game.cub.addCondition("Restrained", target)
    }
    else{
        MidiQOL.applyTokenDamage([{ damage: damageRoll.total, type: "bludgeoning" }], damageRoll.total, targets, null, saves);
    }
}