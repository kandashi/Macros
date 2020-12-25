//DAE Macro Execute, Effect Value = "Macro Name" @target @item.level

let target = canvas.tokens.get(args[1])
let data = {}
/**
 * Create Flame Blade item in inventory
 */
if (args[0] === "on") {
  let weaponDamge = 2 + Math.floor(args[2] / 2);
  await target.actor.createOwnedItem(
    {
      "name": "Summoned Flame Blade",
      "type": "weapon",
      "data": {
        "quantity": 1,
        "activation": {
          "type": "action",
          "cost": 1,
          "condition": ""
        },
        "duration": {
          "value": null,
          "units": ""
        },
        "target": {
          "value": 1,
          "width": null,
          "units": "",
          "type": "creature"
        },
        "range": {
          "value": 5,
          "long": null,
          "units": ""
        },
        "uses": {
          "value": 0,
          "max": 0,
          "per": ""
        },
        "consume": {
          "type": "",
          "target": "",
          "amount": null
        },
        "ability": "",
        "actionType": "msak",
        "attackBonus": "0",
        "chatFlavor": "",
        "critical": null,
        "damage": {
          "parts": [
            [
              `${weaponDamge}d6`,
              "fire"
            ]
          ],
          "versatile": ""
        },
        "weaponType": "simpleM",
        "proficient": true,
      },
      "img": "systems/dnd5e/icons/spells/enchant-orange-2.jpg",
    }
  );
}

// Delete Flame Blade
if (args[0] === "off") {
  let item = target.actor.data.items.find(i => i.name === "Summoned Flame Blade" && i.type === "weapon")
  target.actor.deleteOwnedItem(item._id)
}
