let lastArg = args[args.length - 1];
let target = canvas.tokens.get(lastArg.tokenId);
let tactor = target?.actor;
let DC = parseInt(args[1])
let damageDice = args[2]
if (lastArg.efData.origin.includes(lastArg.actorId)) return;
if (args[0] === "each" || args[0] === "on") {
    if (target.id !== game.combats.active.current.tokenId) return;
    const flavor = `${CONFIG.DND5E.abilities["con"]} DC ${DC} Spirit Guardians}`;
    let saveRoll = (await tactor.rollAbilitySave("wis", { flavor, fastforward: true })).total;
    let damageRoll = new Roll(`${damageDice}d8`).roll();

    if (saveRoll > args[1]) {
        saves.add(target)
        MidiQOL.applyTokenDamage([{ damage: damageRoll.total / 2, type: "radiant" }], damageRoll.total, targets, null, saves);
    }
    else {
        MidiQOL.applyTokenDamage([{ damage: damageRoll.total, type: "radiant" }], damageRoll.total, targets, null, saves);
    }
}