//DAE Item Macro  @attributes.spell.dc
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);

const DAEItem = lastArg.efData.flags.dae.itemData
const saveData = DAEItem.data.save


if (args[0] === "on") {

    // Save the hook data for later access.
    DAE.setFlag(tactor, "ContagionSpell",  {
        count: 0,
    });
}

if (args[0] === "off") {
    // When off, clean up hooks and flags.

    DAE.unsetFlag(tactor, "ContagionSpell", );
}

if (args[0] === "each") {
    let contagion = lastArg.efData;
    if (contagion.label === "Contagion")
        Contagion()
}

/** 
 * Execute contagion effects, update flag counts or remove effect
 * 
 * @param {Actor5e} combatant Current combatant to test against
 * @param {Number} save Target DC for save
 */
async function Contagion() {
    let flag = DAE.getFlag(tactor, "ContagionSpell", );

    const flavor = `${CONFIG.DND5E.abilities[saveData.ability]} DC${saveData.dc} ${DAEItem?.name || ""}`;
    let saveRoll = (await tactor.rollAbilitySave(saveData.ability, { flavor })).total;

    if (saveRoll < saveData.dc) {
        if (flag.count === 2) {
            ChatMessage.create({ content: `Contagion on ${tactor.name} is complete` });
            ContagionMessage();
            return;
        }
        else {
            let contagionCount = (flag.count + 1);
            DAE.setFlag(tactor, "ContagionSpell", {
                count: contagionCount
            });
            console.log(`Contagion increased to ${contagionCount}`);
        }
    }
    else if (saveRoll >= saveData.dc) {
        tactor.deleteEmbeddedEntity("ActiveEffect", lastArg.effectId); 
    }
}

/**
 * Generates the GM client dialog for selecting final Effect, updates target effect with name, icon and new DAE effects.
 */
async function ContagionMessage() {
    new Dialog({
        title: "Contagion options",
        content: "<p>Select the effect</p>",
        buttons: {
            one: {
                label: "Blinding Sickness",
                callback: async () => {
                     let data = {
                        changes: [
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
                        ],
                        icon: "modules/combat-utility-belt/icons/blinded.svg",
                        label: "Blinding Sickness",
                        _id:  lastArg.effectId
                    }
                    tactor.updateEmbeddedEntity("ActiveEffect", data);
                },
            },
            two: {
                label: "Filth Fever",
                callback: async () => {
                    let data = {
                        changes: [
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
                        ],
                        label: "Filth Fever",
                        _id: lastArg.effectId,
                    }
                    tactor.updateEmbeddedEntity("ActiveEffect", data);
                }
            },
            three: {
                label: "Flesh Rot",
                callback: async () => {
                    let data = {
                        changes: [
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
                        ],
                        icon : "systems/dnd5e/icons/skills/blood_09.jpg",
                        label : "Flesh Rot",
                        _id: lastArg.effectId,
                    }
                    tactor.updateEmbeddedEntity("ActiveEffect", data);
                },
            },
            four: {
                label: "Mindfire",
                callback: async () => {
                    let data = {
                        changes: [
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
                        ],
                        icon : "icons/svg/daze.svg",
                        label : "Mindfire",
                        _id: lastArg.effectId,
                    }
                    tactor.updateEmbeddedEntity("ActiveEffect", data);
                }
            },
            five: {
                label: "Seizure",
                callback: async () => {
                    let data = {
                        changes: [
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
                        ],
                        icon : "icons/svg/paralysis.svg",
                        label : "Seizure",
                        _id: lastArg.effectId,
                    }
                    tactor.updateEmbeddedEntity("ActiveEffect", data);
                }
            },
            six: {
                label: "Slimy Doom",
                callback: async () => {
                    let data = {
                        changes: [
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
                        ],
                        icon : "systems/dnd5e/icons/skills/blood_05.jpg",
                        label : "Slimy Doom",
                        _id: lastArg.effecId,
                    }
                    tactor.updateEmbeddedEntity("ActiveEffect", data);
                }
            },
        }
    }).render(true);
}
