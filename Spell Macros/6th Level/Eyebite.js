const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const DAEItem = lastArg.efData.flags.dae.itemData
const saveData = DAEItem.data.save

let folder = await game.packs.get("Dynamic-Effects-SRD.DAE SRD Macros").getContent()
let CUBControl = folder.find(i => i.data.name === "CUB Condition")

/**
 * Dialog appears on players screen, CondtionControll callback execute on GM end 
 */

function EyebiteDialog() {
    new Dialog({
        title: "Eyebite options",
        content: "<p>Target a token and select the effect</p>",
        buttons: {
            one: {
                label: "Asleep",
                callback: async () => {
                    for (let target of game.user.targets) {
                        const flavor = `${CONFIG.DND5E.abilities[saveData.ability]} DC${saveData.dc} ${DAEItem?.name || ""}`;
                        let saveRoll = (await tactor.rollAbilitySave(saveData.ability, { flavor })).total;
                        if (saveRoll < saveData.ability) {
                            ChatMessage.create({ content: `${target.name} failed the save with a ${saveRoll}` });
                            CUBControl.execute("apply", "Unconscious", target);
                        }
                        else {
                            ChatMessage.create({ content: `${target.name} passed the save with a ${saveRoll}` });
                        }
                    }
                }
            },
            two: {
                label: "Panicked",
                callback: async () => {
                    for (let target of game.user.targets) {
                        const flavor = `${CONFIG.DND5E.abilities[saveData.ability]} DC${saveData.dc} ${DAEItem?.name || ""}`;
                        let saveRoll = (await tactor.rollAbilitySave(saveData.ability, { flavor })).total;
                        if (saveRoll < saveData.ability) {
                            ChatMessage.create({ content: `${target.name} failed the save with a ${saveRoll}` });
                            CUBControl.execute("apply", "Frightened", target);
                        }
                        else {
                            ChatMessage.create({ content: `${target.name} passed the save with a ${saveRoll}` });
                        }
                    }
                }
            },
            three: {
                label: "Sickened",
                callback: async () => {
                    for (let target of game.user.targets) {
                        const flavor = `${CONFIG.DND5E.abilities[saveData.ability]} DC${saveData.dc} ${DAEItem?.name || ""}`;
                        let saveRoll = (await tactor.rollAbilitySave(saveData.ability, { flavor })).total;
                        if (saveRoll < saveData.ability) {
                            ChatMessage.create({ content: `${target.name} failed the save with a ${saveRoll}` });
                            CUBControl.execute("apply", "Poisoned", target);
                        }
                        else {
                            ChatMessage.create({ content: `${target.name} passed the save with a ${saveRoll}` });
                        }
                    }
                }
            },
        }
    }).render(true);
}

if (args[0] === "on") {
    EyebiteDialog();
    ChatMessage.create({ content: `${target.name} is blessed with Eyebite` });

}

//Cleanup hooks and flags.
if (args[0] === "each") {
    EyebiteDialog();
}