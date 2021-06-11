

if (args[0] === "on" || args[0] === "each") {
    const lastArg = args[args.length - 1];
    let tactor;
    if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
    else tactor = game.actors.get(lastArg.actorId);
    const target = canvas.tokens.get(lastArg.tokenId)
    const flavor = `${CONFIG.DND5E.abilities["con"]} DC${args[1]} Insect Plague}`;
    let saveRoll = (await tactor.rollAbilitySave("con", { flavor })).total;
    let damageRoll = new Roll(`${args[2] - 1}d10`).roll()
    game.dice3d?.showForRoll(damageRoll)
    let targets = new Set()
    targets.add(target)
    let saves = new Set;
    if (saveRoll > args[1]) {
        saves.add(target)
        MidiQOL.applyTokenDamage([{ damage: damageRoll.total/2, type: "piercing" }], damageRoll.total, targets, null, saves);
    }
    else{
        MidiQOL.applyTokenDamage([{ damage: damageRoll.total, type: "piercing" }], damageRoll.total, targets, null, saves);
    }
}