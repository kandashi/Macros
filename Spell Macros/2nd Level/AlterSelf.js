//DAE Item Macro 
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);

let DAEitem = tactor.items.find(i => i.name === `Unarmed Strike`); // find unarmed strike attack


if (args[0] === "on") {
    new Dialog({
        title: "Are you using Natural Weapons",
        content: "<p>Yes or no</p>",
        buttons: {
            one: {
                label: "Yes",
                callback: () => {
                    if (!DAEitem) {
                        ChatMessage.create({ content: "No unarmed strike found" }); // exit out if no unarmed strike
                        return;
                    }
                    let copy_item = duplicate(DAEitem);
                    DAE.setFlag(tactor, 'AlterSelfSpell', copy_item.data.damage.parts[0][0]); //set flag of previous value
                    copy_item.data.damage.parts[0][0] = "1d6 +@mod"; //replace with new value
                    tactor.updateEmbeddedEntity("OwnedItem", copy_item); //update item
                    ChatMessage.create({ content: "Unarmed strike is altered" });
                }
            },
            two: {
                label: "No",
                callback: () => ChatMessage.create({ content: `Unarmed strike not altered` })
            },
        }
    }).render(true);
}
if (args[0] === "off") {
    let damage = DAE.getFlag(tactor, 'AlterSelfSpell'); // find flag with previous values
    let copy_item = duplicate(item);
    copy_item.data.damage.parts[0][0] = damage; //replace with old value
    tactor.updateEmbeddedEntity("OwnedItem", copy_item); //update item
    DAE.unsetFlag(tactor, 'world', 'AlterSelfSpell',); //remove flag
    ChatMessage.create({ content: `Alter Self expired, unarmed strike returned` });
}