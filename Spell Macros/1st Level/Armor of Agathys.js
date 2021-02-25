//DAE Item Macro, Effect Value = @item.level
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const DAEitem = lastArg.efData.flags.dae.itemData

if (args[0] === "on") {
    let damage = (5 * args[1]); // calculate damage/tempHP values
    tactor.update({ "data.attributes.hp.temp": damage }); // add tempHP
    tactor.createOwnedItem({ // create item to deal damage to target, no "auto" damage

        "name": "Armor of Agathys",
        "type": "weapon",
        "data": {
            "actionType": "other",
            "chatFlavor": "Armor of Agathys damage",
            "damage": {
                "parts": [
                    [
                        `${damage}`,
                        "cold"
                    ]
                ],
            },
        },
        "flags": {
            "midi-qol": {
                "onUseMacroName": ""
            },
            "DAE": {
                "ArmorOfAgathys": {
                    "ActorId" : tactor.id
                }
            },
        },
        "img": DAEitem.img,
    });
}
if (args[0] === "off") {
    let item = tactor.items.find(i => i.flags?.DAE?.ArmorOfAgathys?.ActorId === tactor.id) // find item 
    tactor.deleteEmbeddedEntity("OwnedItem", item._id); //delete item
}