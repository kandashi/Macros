//DAE Macro, Effect Value = @attributes.spelldc
if (!game.modules.get("advanced-macros")?.active) { ui.notifications.error("Please enable the Advanced Macros module"); return; }
if (!game.modules.get("combat-utility-belt")?.active) { ui.notifications.error("Please enable the CUB module"); return; }

const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);

const DAEItem = lastArg.efData.flags.dae.itemData
const saveData = DAEItem.data.save
let dc = args[1]

if (args[0] === "on") {
    await game.cub.addCondition("Restrained", tactor)
    await DAE.setFlag(tactor, "FleshToStoneSpell", {
        successes: 0,
        failures: 1
    });
}

if (args[0] === "off") {
    DAE.unsetFlag("world", "FleshToStoneSpell");
    ChatMessage.create({ content: "Flesh to stone ends, if concentration was maintained for the entire duration,the creature is turned to stone until the effect is removed. " });
}

if (args[0] === "each") {
    let flag = DAE.getFlag(tactor, "FleshToStoneSpell");
    if (flag.failures === 3) return;
    const flavor = `${CONFIG.DND5E.abilities[saveData.ability]} DC${dc} ${DAEItem?.name || ""}`;
    let saveRoll = (await tactor.rollAbilitySave(saveData.ability, { flavor })).total;

    if (saveRoll < dc) {
        if (flag.failures === 2) {
            let fleshToStoneFailures = (flag.failures + 1);

            DAE.setFlag(tactor, "FleshToStoneSpell", {
                failures: fleshToStoneFailures
            });
            ChatMessage.create({ content: `Flesh To Stone on ${tactor.name} is complete` });
            FleshToStoneUpdate();
            return;
        }
        else {
            let fleshToStoneFailures = (flag.failures + 1);

            DAE.setFlag(tactor, "FleshToStoneSpell", {
                failures: fleshToStoneFailures
            });
            console.log(`Flesh To Stone failures increments to ${fleshToStoneFailures}`);

        }
    }
    else if (saveRoll >= dc) {
        if (flag.successes === 2) {
            ChatMessage.create({ content: `Flesh To Stone on ${tactor.name} ends` });
            await tactor.deleteEmbeddedDocuments("ActiveEffect", [lastArg.effectId]);
            await game.cub.removeCondition("Restrained", tactor)
            return;
        }
        else {
            let fleshToStoneSuccesses = (flag.successes + 1);
            DAE.setFlag(tactor, "FleshToStoneSpell", {
                successes: fleshToStoneSuccesses
            });
            console.log(`Flesh To Stone successes to ${fleshToStoneSuccesses}`);
        }
    }
}

/**
 * Update token with accurate DAE effect
 */
async function FleshToStoneUpdate() {
    let fleshToStone = tactor.effects.get(lastArg.effectId);
    let icon = fleshToStone.data.icon;
    if (game.modules.get("combat-utility-belt").active) icon = "modules/combat-utility-belt/icons/petrified.svg";
    else icon = "icons/svg/paralysis.svg"
    let label = fleshToStone.data.label;
    label = "Flesh to Stone - Petrified";
    let time = fleshToStone.data.duration.seconds
    time = 60000000
    fleshToStone.update({ icon, label, time });

}