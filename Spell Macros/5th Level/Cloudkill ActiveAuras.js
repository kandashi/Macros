if (!game.modules.get("advanced-macros")?.active) { ui.notifications.error("Advanced Macros is not enabled"); return }

let lastArg = args[args.length - 1];
let target = canvas.tokens.get(lastArg.tokenId);
let tactor = target?.actor;
let DC = parseInt(args[1])
if (args[0] === "on" || args[0] === "each") {
    const flavor = `${CONFIG.DND5E.abilities["con"]} DC ${DC} Cloudkill }`;
    let saveRoll = (await tactor.rollAbilitySave("con", { flavor, fastforward: true }))?.total;
    if (!saveRoll) return;
    let damageRoll = new Roll("5d8[poison]").roll();
    damageRoll.toMessage({ flavor: "Cloudkill Damage" })
    let targets = new Set()
    targets.add(target)
    let saves = new Set;
    if (saveRoll > args[1]) {
        saves.add(target)
        MidiQOL.applyTokenDamage([{ damage: damageRoll.total / 2, type: "poison" }], damageRoll.total, targets, null, saves);
    }
    else {
        MidiQOL.applyTokenDamage([{ damage: damageRoll.total, type: "poison" }], damageRoll.total, targets, null, saves);
    }
}