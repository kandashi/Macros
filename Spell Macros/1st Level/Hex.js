debugger
if (args[0].hitTargets.length === 0) return;
if (args[0].tag === "OnUse") {
    let target = args[0].hitTargets[0]._id;
    let actorId = args[0].actor._id; // actor who cast the spell
    actor = game.actors.get(actorId);
    if (!actor || !target) {
        console.error("Hex: no token/target selected");
        return;
    }

    // First remove the old effects from the target and ourselves 
    let item = actor.items.get(args[0].id);

    // have to remove the effect from old target if we are changing targets
    let oldTarget = getProperty(actor.data, "flags.midi-qol.hex");
    DAE.deleteActiveEffect(oldTarget, item.uuid)

    // now remove it from ourselves
    let effect = actor.effects.find(e => e.data.origin === item.uuid);
    console.error("Effect is ", effect)
    if (effect) await actor.deleteEmbeddedEntity("ActiveEffect", effect.id);


    const effectData = {
        changes: [
            { key: "flags.midi-qol.hex", mode: 5, value: target, priority: 20 }, // who is marked
            { key: "flags.dnd5e.DamageBonusMacro", mode: 5, value: `ItemMacro.${args[0].item.name}`, priority: 20 }, // macro to apply the damage
        ],
        origin: args[0].uuid, //flag the effect as associated to the spell being cast
        disabled: false,
        duration: args[0].item.effects[0].duration,
        icon: args[0].item.img,
        label: args[0].item.name
    }
    await actor.createEmbeddedEntity("ActiveEffect", effectData);

} else if (args[0].tag === "DamageBonus") {
    if (args[0].hitTargets.length === 0) return;
    let targetId = args[0].hitTargets[0]._id;
    // only on the marked target
    if (targetId !== getProperty(args[0].actor.flags, "midi-qol.hex")) return {};
    let damageType = args[0].item.data.damage.parts[0][1];
    return { damageRoll: `1d6[${damageType}]`, flavor: "Hex Damage" }
}