

if (args[0] === "on" || args[0] === "each") {
    const lastArg = args[args.length - 1];
    let tactor;
    if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
    else tactor = game.actors.get(lastArg.actorId);
    const target = canvas.tokens.get(lastArg.tokenId)
    let damageRoll = new Roll(`2d4`).roll()
    let targets = new Set();
    let saves = new Set();
    targets.add(target);
    saves.add(target);
    await MidiQOL.applyTokenDamage([{ damage: damageRoll.total, type: "piercing" }], damageRoll.total, targets, null, saves);
    let effect = tactor.effects.find(i => i.label === "Spike Growth")
    await effect.delete()
}