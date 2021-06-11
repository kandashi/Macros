// DAE macro, args : @attributes.spelldc
if(!game.modules.get("advanced-macros")?.active) {ui.notifications.error("Please enable the Advanced Macros module") ;return;}
if(!game.modules.get("combat-utility-belt")?.active) {ui.notifications.error("Please enable the CUB module"); return;}

const lastArg = args[args.length - 1];
const DC = args[1]
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const DAEItem = lastArg.efData.flags.dae.itemData
let target = canvas.tokens.get(lastArg.tokenId)

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
                    for (let t of game.user.targets) {
                        const flavor = `${CONFIG.DND5E.abilities["wis"]} DC${DC} ${DAEItem?.name || ""}`;
                        let saveRoll = (await tactor.rollAbilitySave("wis", { flavor })).total;
                        if (saveRoll < DC) {
                            ChatMessage.create({ content: `${t.name} failed the save with a ${saveRoll}` });
                            CUBControl.execute("apply", "Unconscious", t);
                        }
                        else {
                            ChatMessage.create({ content: `${t.name} passed the save with a ${saveRoll}` });
                        }
                    }
                }
            },
            two: {
                label: "Panicked",
                callback: async () => {
                    for (let t of game.user.targets) {
                        const flavor = `${CONFIG.DND5E.abilities["wis"]} DC${DC} ${DAEItem?.name || ""}`;
                        let saveRoll = (await tactor.rollAbilitySave("wis", { flavor })).total;
                        if (saveRoll < DC) {
                            ChatMessage.create({ content: `${t.name} failed the save with a ${saveRoll}` });
                            CUBControl.execute("apply", "Frightened", t);
                        }
                        else {
                            ChatMessage.create({ content: `${t.name} passed the save with a ${saveRoll}` });
                        }
                    }
                }
            },
            three: {
                label: "Sickened",
                callback: async () => {
                    for (let t of game.user.targets) {
                        const flavor = `${CONFIG.DND5E.abilities["wis"]} DC${DC} ${DAEItem?.name || ""}`;
                        let saveRoll = (await tactor.rollAbilitySave("wis", { flavor })).total;
                        if (saveRoll < DC) {
                            ChatMessage.create({ content: `${t.name} failed the save with a ${saveRoll}` });
                            CUBControl.execute("apply", "Poisoned", t);
                        }
                        else {
                            ChatMessage.create({ content: `${t.name} passed the save with a ${saveRoll}` });
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
