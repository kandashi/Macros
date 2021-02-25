//DAE Item Macro 

const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);

const DAEItem = lastArg.efData.flags.dae.itemData
const saveData = DAEItem.data.save

/**
 * Add crown of starts item to target, update to fix count and self-consumption.
 */
if (args[0] === "on") {
  let starCount = 7 + ((DAEItem.data.level - 7) * 2)
  await tactor.createOwnedItem(
    {
      "name": "Crown of Stars",
      "type": "weapon",
      "data": {
        "description": {
          "value": null,
        },
        "activation": {
          "type": "bonus",
          "cost": 1,
        },
        "target": {
          "value": 1,
          "type": "creature",
        },
        "range": {
          "value": 120,
          "long": null,
          "units": "ft",
        },
        "uses": {
          "value": starCount,
          "max": starCount,
          "per": "charges",
        },
        "consume": {
          "type": "charges",
          "target": "",
          "amount": 1,
        },
        "ability": "int",
        "actionType": "rsak",
        "damage": {
          "parts": [
            [
              "4d12",
              "",
            ]
          ],
          "versatile": ""
        },

        "weaponType": "simpleR",
        "proficient": true,
      },
      "img": "systems/dnd5e/icons/spells/fireball-sky-1.jpg",
    },
  )
  let item = tactor.data.items.find(i => i.name === "Crown of Stars")
  let copy_item = duplicate(item)
  copy_item.data.consume.target = copy_item._id;
  tactor.updateEmbeddedEntity("OwnedItem", copy_item);
}

/**
 * Remove crown of starts items
 */
if (args[0] === "off") {
  let item = tactor.data.items.find(i => i.name === "Crown of Stars")
  tactor.deleteOwnedItem(item._id)
}
