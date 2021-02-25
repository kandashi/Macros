//DAE Macro Execute, Effect Value = "Macro Name" @target @attributes.spelldc @item

const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);

const DAEItem = lastArg.efData.flags.dae.itemData
const saveData = DAEItem.data.save


if (args[0] === "each") {
    new Dialog({
        title: "Use action to make a wisdom save to end Irresistible Dance?",
        buttons: {
            one: {
                label: "Yes",
                callback: async () => {
                    const flavor = `${CONFIG.DND5E.abilities[saveData.ability]} DC${saveData.dc} ${DAEItem?.name || ""}`;
                    let saveRoll = (await tactor.rollAbilitySave(saveData.ability, { flavor })).total;

                    if (saveRoll >= saveData.dc) {
                        target.actor.deleteEmbeddedEntity("ActiveEffect", lastArg.effectId);
                    }
                    if (saveRoll < saveData.dc) {
                        ChatMessage.create({ content: `${target.name} fails the save` });
                    }
                }
            },
            two: {
                label: "No",
                callback: () => {
                }
            }
        }
    }).render(true);
}