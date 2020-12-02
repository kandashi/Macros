//DAE Macro Execute, Effect Value = "Macro Name" @target @attributes.spelldc
let target = canvas.tokens.get(args[1])
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");
let ActorGetFlag = game.macros.getName("ActorGetFlag");

if (args[0] === "on") {
    const hookId = Hooks.on("preUpdateCombat", (combat, changed, options, userId) => {
        if (!("turn" in changed)) return;

        if (combat.combatant.tokenId === args[1]) {
            Contagion(target, args[2]);
        }
    });
    target.setFlag("world", "ContagionSpell", {
        hook: hookId,
        count: 0
    });


} else if (args[0] === "off") {
    ContagionOff()
}

async function Contagion(combatant, save) {
    let flag = target.getFlag("world", "ContagionSpell")
    let saveRoll = await combatant.actor.rollAbilitySave("con")

    console.log("Save roll is " + saveRoll.results[0])
    if (saveRoll.results[0] < save) {
        if (flag.count === 2) {
            ChatMessage.create({ content: `Contagion on ${name} is complete` })
            ContagionMessage()
            return;
        } else {
            let contagionCount = (flag.count + 1);

            target.setFlag("world", "ContagionSpell", {
                count: contagionCount
            })
            console.log(`Contagion increased to ${contagionCount}`)

        }
    } else if (saveRoll.resutls[0] > save) {
        ContagionOff()
    }

}

async function ContagionMessage() {
    new Dialog({
        title: "Contagion options",
        content: "<p>Select the effect</p>",
        buttons: {
            one: {
                label: "Blinding Sickness",
                callback: async () => {
                    let contagion = target.actor.effects.find(i => i.data.label === "Contagion");
                    let changes = contagion.data.changes;
                    changes = [{
                        key: "flags.midi-qol.disadvantage.ability.check.wis",
                        mode: 5,
                        priority: 20,
                        value: "1"
                    },
                    {
                        key: "flags.midi-qol.disadvantage.ability.save.wis",
                        mode: 5,
                        priority: 20,
                        value: "1"
                    }]
                    let icon = contagion.data.icon
                    icon = "modules/combat-utility-belt/icons/blinded.svg"
                    let label = contagion.data.label
                    label = "Blinding Sickness";
                    contagion.update({ changes, icon, label });
                    await ContagionOff()
                },
            },
            two: {
                label: "Filth Fever",
                callback: async () => {
                    let contagion = target.actor.effects.find(i => i.data.label === "Contagion");
                    let changes = contagion.data.changes;
                    changes = [{
                        key: "flags.midi-qol.disadvantage.attack.mwak",
                        mode: 5,
                        priority: 20,
                        value: "1"
                    },
                    {
                        key: "flags.midi-qol.disadvantage.attack.rwak",
                        mode: 5,
                        priority: 20,
                        value: "1"
                    },
                    {
                        key: "flags.midi-qol.disadvantage.ability.check.str",
                        mode: 5,
                        priority: 20,
                        value: "1"
                    },
                    {
                        key: "flags.midi-qol.disadvantage.ability.save.str",
                        mode: 5,
                        priority: 20,
                        value: "1"
                    }]
                    let label = contagion.data.label
                    label = "Filth Fever";
                    contagion.update({ changes, label });
                    await ContagionOff()
                }
            },
            three: {
                label: "Flesh Rot",
                callback: async () => {
                    let contagion = target.actor.effects.find(i => i.data.label === "Contagion");
                    let changes = contagion.data.changes;
                    changes = [{
                        key: "flags.midi-qol.disadvantage.ability.check.cha",
                        mode: 5,
                        priority: 20,
                        value: "1"
                    },
                    {
                        key: "data.traits.dv.all",
                        mode: 0,
                        priority: 20,
                        value: "1"
                    }]
                    let icon = contagion.data.icon
                    icon = "systems/dnd5e/icons/skills/blood_09.jpg"
                    let label = contagion.data.label
                    label = "Flesh Rot";
                    contagion.update({ changes, icon });
                    ContagionOff()
                }
            },
            four: {
                label: "Mindfire",
                callback: async () => {
                    let contagion = target.actor.effects.find(i => i.data.label === "Contagion");
                    let changes = contagion.data.changes;
                    changes = [{
                        key: "flags.midi-qol.disadvantage.ability.check.int",
                        mode: 5,
                        priority: 20,
                        value: "1"
                    },
                    {
                        key: "flags.midi-qol.disadvantage.ability.save.int",
                        mode: 5,
                        priority: 20,
                        value: "1"
                    }]
                    let icon = contagion.data.icon
                    icon = "icons/svg/daze.svg"
                    let label = contagion.data.label
                    label = "Mindfire";
                    contagion.update({ changes, icon });
                    ContagionOff()
                }
            },
            five: {
                label: "Seizure",
                callback: async () => {
                    let contagion = target.actor.effects.find(i => i.data.label === "Contagion");
                    let changes = contagion.data.changes;
                    changes = [
                        {
                            key: "flags.midi-qol.disadvantage.attack.mwak",
                            mode: 5,
                            priority: 20,
                            value: "1"
                        },
                        {
                            key: "flags.midi-qol.disadvantage.attack.rwak",
                            mode: 5,
                            priority: 20,
                            value: "1"
                        },
                        {
                            key: "flags.midi-qol.disadvantage.ability.check.dex",
                            mode: 5,
                            priority: 20,
                            value: "1"
                        },
                        {
                            key: "flags.midi-qol.disadvantage.ability.save.dex",
                            mode: 5,
                            priority: 20,
                            value: "1"
                        }]
                    let icon = contagion.data.icon
                    icon = "icons/svg/paralysis.svg"
                    let label = contagion.data.label
                    label = "Seizure";
                    contagion.update({ changes, icon });
                    ContagionOff()
                }
            },
            six: {
                label: "Slimy Doom",
                callback: async () => {
                    let contagion = target.actor.effects.find(i => i.data.label === "Contagion");
                    let changes = contagion.data.changes;
                    changes = [{
                        key: "flags.midi-qol.disadvantage.ability.check.con",
                        mode: 5,
                        priority: 20,
                        value: "1"
                    },
                    {
                        key: "flags.midi-qol.disadvantage.ability.save.con",
                        mode: 5,
                        priority: 20,
                        value: "1"
                    }]
                    let icon = contagion.data.icon
                    icon = "systems/dnd5e/icons/skills/blood_05.jpg"
                    let label = contagion.data.label
                    label = "Slimy Doom";
                    contagion.update({ changes, icon });
                    ContagionOff()
                }
            },
        }
    }).render(true)
}

async function ContagionOff() {
    let flag = await target.getFlag("world", "ContagionSpell");
    Hooks.off("preUpdateCombat", flag.hook);
    target.unsetFlag("world", "ContagionSpell");
}