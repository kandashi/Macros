//DAE Macro Execute, Effect Value = "Macro Name" @target @item.level


let target = canvas.tokens.get(args[1])

/**
 * Add crown of starts item to target, update to fix count and self-consumption.
 */
if (args[0] === "on") {
  let starCount = 7 + ((args[2] - 7) * 2)
  await target.actor.createOwnedItem(
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
          "width": null,
          "units": "",
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
        "formula": "",
        "save": {
          "ability": "",
          "dc": null,
          "scaling": "spell",
        },
        "armor": {
          "value": 10,
        },
        "weaponType": "simpleR",
        "proficient": true,
      },
      "sort": 4000000,
      "img": "systems/dnd5e/icons/spells/fireball-sky-1.jpg",
    },
  )
  let item = target.actor.data.items.find(i => i.name === "Crown of Stars")
  let copy_item = duplicate(item)
  copy_item.data.consume.target = copy_item._id;
  target.actor.updateEmbeddedEntity("OwnedItem", copy_item);
}

/**
 * Remove crown of starts items
 */
if (args[0] === "off") {
  let item = target.actor.data.items.find(i => i.name === "Crown of Stars")
  target.actor.deleteOwnedItem(item._id)
}