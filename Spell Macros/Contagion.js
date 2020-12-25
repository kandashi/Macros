//DAE Macro Execute, Effect Value = "Macro Name" @target @attributes.spelldc
let target = canvas.tokens.get(args[1]);

if (args[0] === "on") {
    // Set a hook to read the current combatant, if that combatant has the effect execute the contagion effect.
    const hookId = Hooks.on("preUpdateCombat", (combat, changed, options, userId) => {
        if (!("turn" in changed)) return;

        if (combat.combatant.tokenId === args[1]) {
            Contagion(target, args[2]);
        }
    });

    // Save the hook data for later access.
    target.setFlag("world", "ContagionSpell", {
        hook: hookId,
        count: 0,
    });
}

if (args[0] === "off") {
    // When off, clean up hooks and flags.
    async function ContagionOff() {
        let flag = await target.getFlag("world", "ContagionSpell");
        Hooks.off("preUpdateCombat", flag.hook);
        target.unsetFlag("world", "ContagionSpell");
    }
    ContagionOff();
}

/** 
 * Execute contagion effects, update flag counts or remove effect
 * 
 * @param {Actor5e} combatant Current combatant to test against
 * @param {Number} save Target DC for save
 */
async function Contagion(combatant, save) {
    let flag = target.getFlag("world", "ContagionSpell");
    let saveRoll = await combatant.actor.rollAbilitySave("con");
    ChatMessage.create({ content: `${target.name} rolls a ${saveRoll.total} vs a ${save}` });
    if (saveRoll._total < save) {
        if (flag.count === 2) {
            ChatMessage.create({ content: `Contagion on ${name} is complete` });
            ContagionMessage();
            return;
        }
        else {
            let contagionCount = (flag.count + 1);
            target.setFlag("world", "ContagionSpell", {
                count: contagionCount
            });
            console.log(`Contagion increased to ${contagionCount}`);
        }
    }
    else if (saveRoll._total >= save) {
        let effect = actor.effects.find(i => i.data.label === "Contagion");
        effect.delete();
    }
}

/**
 * Generates the GM client dialog for selecting final Effect, updates target effect with name, icon and new DAE effects.
 */
async function ContagionMessage() {
    let contagion = target.actor.effects.find(i => i.data.label === "Contagion");
    let changes = contagion.data.changes;
    let icon = contagion.data.icon;
    let label = contagion.data.label;

    new Dialog({
        title: "Contagion options",
        content: "<p>Select the effect</p>",
        buttons: {
            one: {
                label: "Blinding Sickness",
                callback: async () => {
                    changes = [
                        {
                            key: "flags.midi-qol.disadvantage.ability.check.wis",
                            mode: 5,
                            priority: 20,
                            value: "1",
                        },
                        {
                            key: "flags.midi-qol.disadvantage.ability.save.wis",
                            mode: 5,
                            priority: 20,
                            value: "1",
                        },
                    ];
                    icon = "modules/combat-utility-belt/icons/blinded.svg";
                    label = "Blinding Sickness";
                    contagion.update({ changes, icon, label });
                    await ContagionOff();
                },
            },
            two: {
                label: "Filth Fever",
                callback: async () => {
                    changes = [
                        {
                            key: "flags.midi-qol.disadvantage.attack.mwak",
                            mode: 5,
                            priority: 20,
                            value: "1",
                        },
                        {
                            key: "flags.midi-qol.disadvantage.attack.rwak",
                            mode: 5,
                            priority: 20,
                            value: "1",
                        },
                        {
                            key: "flags.midi-qol.disadvantage.ability.check.str",
                            mode: 5,
                            priority: 20,
                            value: "1",
                        },
                        {
                            key: "flags.midi-qol.disadvantage.ability.save.str",
                            mode: 5,
                            priority: 20,
                            value: "1",
                        },
                    ];
                    label = "Filth Fever";
                    contagion.update({ changes, label });
                    await ContagionOff();
                }
            },
            three: {
                label: "Flesh Rot",
                callback: async () => {
                    changes = [
                        {
                            key: "flags.midi-qol.disadvantage.ability.check.cha",
                            mode: 5,
                            priority: 20,
                            value: "1",
                        },
                        {
                            key: "data.traits.dv.all",
                            mode: 0,
                            priority: 20,
                            value: "1",
                        },
                    ];
                    icon = "systems/dnd5e/icons/skills/blood_09.jpg";
                    label = "Flesh Rot";
                    contagion.update({ changes, icon });
                    ContagionOff();
                }
            },
            four: {
                label: "Mindfire",
                callback: async () => {
                    changes = [
                        {
                            key: "flags.midi-qol.disadvantage.ability.check.int",
                            mode: 5,
                            priority: 20,
                            value: "1",
                        },
                        {
                            key: "flags.midi-qol.disadvantage.ability.save.int",
                            mode: 5,
                            priority: 20,
                            value: "1",
                        },
                    ];
                    icon = "icons/svg/daze.svg";
                    label = "Mindfire";
                    contagion.update({ changes, icon });
                    ContagionOff();
                }
            },
            five: {
                label: "Seizure",
                callback: async () => {
                    changes = [
                        {
                            key: "flags.midi-qol.disadvantage.attack.mwak",
                            mode: 5,
                            priority: 20,
                            value: "1",
                        },
                        {
                            key: "flags.midi-qol.disadvantage.attack.rwak",
                            mode: 5,
                            priority: 20,
                            value: "1",
                        },
                        {
                            key: "flags.midi-qol.disadvantage.ability.check.dex",
                            mode: 5,
                            priority: 20,
                            value: "1",
                        },
                        {
                            key: "flags.midi-qol.disadvantage.ability.save.dex",
                            mode: 5,
                            priority: 20,
                            value: "1",
                        },
                    ];
                    icon = "icons/svg/paralysis.svg";
                    label = "Seizure";
                    contagion.update({ changes, icon });
                    ContagionOff();
                }
            },
            six: {
                label: "Slimy Doom",
                callback: async () => {
                    changes = [
                        {
                            key: "flags.midi-qol.disadvantage.ability.check.con",
                            mode: 5,
                            priority: 20,
                            value: "1",
                        },
                        {
                            key: "flags.midi-qol.disadvantage.ability.save.con",
                            mode: 5,
                            priority: 20,
                            value: "1",
                        },
                    ];
                    icon = "systems/dnd5e/icons/skills/blood_05.jpg";
                    label = "Slimy Doom";
                    contagion.update({ changes, icon });
                    ContagionOff();
                }
            },
        }
    }).render(true);
}
