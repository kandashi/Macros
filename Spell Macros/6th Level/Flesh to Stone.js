//DAE Macro Execute, Effect Value = "Macro Name" @target @attributes.spelldc

/**
 * Hooks set on target, every turn in initative roll
 */
let target = canvas.tokens.get(args[1]);

if (args[0] === "on") {
    const hookId = Hooks.on("preUpdateCombat", (combat, changed, options, userId) => {
        if (!("turn" in changed)) return;

        if (combat.combatant.tokenId === args[1]) {
            FleshToStone(target, args[2]);
        }
    });

    target.actor.setFlag("world", "FleshToStoneSpell", {
        hook: hookId,
        successes: 0,
        failures: 0
    });
}

if (args[0] === "off") {
    FleshToStoneOff();
    ChatMessage.create({ content: "Flesh to stone ends, if concentration was maintained for the entire duration,the creature is turned to stone until the effect is removed. " });
}

//cleanup flags and hooks
async function FleshToStoneOff() {
    let flag = await target.actor.getFlag("world", "FleshToStoneSpell");
    Hooks.off("preUpdateCombat", flag.hook);
    target.actor.unsetFlag("world", "FleshToStoneSpell");
}
/**
 * Execute Flesh to Stone on combatant, update flags to count saves/fails
 * @param {Actor5e} combatant current combatant
 * @param {Number} save spell save DC
 */
async function FleshToStone(combatant, save) {
    let flag = target.actor.getFlag("world", "FleshToStoneSpell");
    let saveRoll = await combatant.actor.rollAbilitySave("con");

    ChatMessage.create({content: `${combatant.name}'s save roll is ${roll.total}`});
    if (saveRoll._total < save) {
        if (flag.failures === 2) {
            ChatMessage.create({ content: `Flesh To Stone on ${name} is complete` });
            FleshToStoneMessage();
            return;
        }
        else {
            let fleshToStoneFailures = (flag.failures + 1);

            target.actor.setFlag("world", "FleshToStoneSpell", {
                failures: fleshToStoneFailures
            });
            console.log(`Flesh To Stone failures to ${fleshToStoneFailures}`);

        }
    }
    else if (saveRoll._total > save) {
        if (flag.successes === 2) {
            ChatMessage.create({ content: `Flesh To Stone on ${name} ends` });
            let effect = target.actor.effects.find(i => i.data.label === "Flesh to Stone");
            effect.delete();
            return;
        }
        else {
            let fleshToStoneSuccesses = (flag.successes + 1);
            target.actor.setFlag("world", "FleshToStoneSpell", {
                successes: fleshToStoneSuccesses
            });
            console.log(`Flesh To Stone successes  to ${fleshToStoneSuccesses}`);
        }
    }
}

/**
 * Update token with accurate DAE effect
 */
async function FleshToStoneMessage() {
    let fleshToStone = target.actor.effects.find(i => i.data.label === "Flesh to Stone");
    let icon = fleshToStone.data.icon;
    icon = "modules/combat-utility-belt/icons/petrified.svg";
    let label = fleshToStone.data.label;
    label = "Flesh to Stone - Petrified";
    fleshToStone.update({ icon, label });
    FleshToStoneOff();
}
