//DAE Macro Execute, Effect Value = "Macro Name" @target @item.level

let target = canvas.tokens.get(args[1])

/**
 * Create Minute Meteor item in inventory, update to consume itself
 */
if (args[0] === "on") {
  let meteorCount = 6 + ((args[2] - 3) * 2)
  await target.actor.createOwnedItem(
    {
      "name": "Minute Meteors",
      "type": "weapon",
      "data": {
        "quantity": 1,
        "attuned": false,
        "equipped": true,
        "identified": true,
        "activation": {
          "type": "bonus",
          "cost": 0.5,
          "condition": ""
        },
        "target": {
          "value": 5,
          "width": null,
          "units": "ft",
          "type": "radius"
        },
        "range": {
          "value": 120,
          "long": null,
          "units": "ft"
        },
        "uses": {
          "value": meteorCount,
          "max": meteorCount,
          "per": "charges"
        },
        "consume": {
          "type": "charges",
          "target": "FsH5kHmkJXsjzr6H",
          "amount": 1
        },
        "ability": "",
        "actionType": "save",
        "attackBonus": 0,
        "chatFlavor": "",
        "critical": null,
        "damage": {
          "parts": [
            [
              "2d6",
              "fire"
            ]
          ],
        },
        "formula": "",
        "save": {
          "ability": "dex",
          "dc": null,
          "scaling": "spell"
        },
        "weaponType": "simpleR",
      },
      "img": "systems/dnd5e/icons/spells/fireball-red-1.jpg",
    },
  );
  let item = target.actor.data.items.find(i => i.name === "Minute Meteors")
  let copy_item = duplicate(item)
  copy_item.data.consume.target = copy_item._id;
  target.actor.updateEmbeddedEntity("OwnedItem", copy_item);
}

// Delete meteors
if (args[0] === "off") {
  let item = target.actor.data.items.find(i => i.name === "Minute Meteors")
  target.actor.deleteOwnedItem(item._id)
}
