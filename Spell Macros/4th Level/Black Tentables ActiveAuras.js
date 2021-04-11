
    const lastArg = args[args.length - 1];
    let tactor;
    if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
    else tactor = game.actors.get(lastArg.actorId);
    const target = canvas.tokens.get(lastArg.tokenId)
if (args[0] === "on") {
    const flavor = `${CONFIG.DND5E.abilities["dex"]} DC${args[1]} Black Tentacles`;
    let saveRoll = (await tactor.rollAbilitySave("dex", { flavor })).total;
    if (saveRoll < args[1]) {
        let damageRoll = new Roll(`3d6`).roll()
        game.dice3d?.showForRoll(damageRoll)
        let targets = new Set();
        let saves = new Set();
        targets.add(target);
        saves.add(target);
        MidiQOL.applyTokenDamage([{ damage: damageRoll.total, type: "bludgeoning" }], damageRoll.total, targets, null, saves);
        game.cub.addCondition("Restrained", tactor)
    }
}

if (args[0] === "each") {
    if(game.cub.hasCondition("Restrained", tactor)){
        let damageRoll = new Roll(`3d6`).roll()
        game.dice3d?.showForRoll(damageRoll)
        let targets = new Set();
        let saves = new Set();
        targets.add(target);
        saves.add(target);
        MidiQOL.applyTokenDamage([{ damage: damageRoll.total, type: "bludgeoning" }], damageRoll.total, targets, null, saves);
    }
    else{
        const flavor = `${CONFIG.DND5E.abilities["dex"]} DC${args[1]} Black Tentacles`;
    let saveRoll = (await tactor.rollAbilitySave("dex", { flavor })).total;
    if (saveRoll < args[1]) {
        let damageRoll = new Roll(`3d6`).roll()
        game.dice3d?.showForRoll(damageRoll)
        let targets = new Set();
        let saves = new Set();
        targets.add(target);
        saves.add(target);
        MidiQOL.applyTokenDamage([{ damage: damageRoll.total, type: "bludgeoning" }], damageRoll.total, targets, null, saves);
        game.cub.addCondition("Restrained", tactor)
    }
    }
}