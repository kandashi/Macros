

if (args[0] === "on" || args[0] === "each") {
    const lastArg = args[args.length - 1];
    let tactor;
    if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
    else tactor = game.actors.get(lastArg.actorId);
    const target = canvas.tokens.get(lastArg.tokenId)
    const flavor = `${CONFIG.DND5E.abilities["dex"]} DC${args[1]} "Cloudkill"}`;
    let saveRoll = (await tactor.rollAbilitySave("con", { flavor })).total;
    let damageRoll = new Roll(`${args[2]}d8`).roll()
    game.dice3d?.showForRoll(damageRoll)
    let targets = new Set();
    let saves = new Set();
    targets.add(target);
    saves.add(target);
    if (saveRoll < args[1]) {
        MidiQOL.applyTokenDamage([{ damage: damageRoll.total, type: "poison" }], damageRoll.total, targets, null, saves);
    }
    else if (saveRoll >= args[1]) {
        MidiQOL.applyTokenDamage([{ damage: damageRoll.total / 2, type: "poison" }], damageRoll.total, targets, null, saves);

    }
}