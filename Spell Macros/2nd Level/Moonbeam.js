//DAE Macro Execute, Effect Value = "Macro Name" @target @item.level

let target = canvas.tokens.get(args[1])
let data = {}
/**
 * Create Moonbeam item in inventory
 */
if (args[0] === "on") {
  let damage = args[2];
  await target.actor.createOwnedItem(
    {
      "name": "Moonbeam repeating",
      "type": "spell",
      "data": {
        "description": {
          "value": "",
          "chat": "",
          "unidentified": ""
        },
        "source": "",
        "activation": {
          "type": "special",
          "cost": 0,
          "condition": ""
        },
        "duration": {
          "value": null,
          "units": ""
        },
        "target": {
          "value": 5,
          "width": null,
          "units": "ft",
          "type": "cylinder"
        },
        "range": {
          "value": 120,
          "long": null,
          "units": "ft"
        },
        "ability": "",
        "actionType": "save",
        "attackBonus": 0,
        "damage": {
          "parts": [
            [
              `${damage}d10`,
              "radiant"
            ]
          ],
          "versatile": ""
        },
        "formula": "",
        "save": {
          "ability": "con",
          "dc": null,
          "scaling": "spell"
        },
        "level": 0,
        "school": "abj",
        "preparation": {
          "mode": "prepared",
          "prepared": false
        },
        "scaling": {
          "mode": "none",
          "formula": ""
        }
      },
      "img": "systems/dnd5e/icons/spells/beam-blue-3.jpg",
    }
  );
}

// Delete Moonbeam
if (args[0] === "off") {
  let item = target.actor.data.items.find(i => i.name === "Moonbeam repeating" && i.type === "spell")
  target.actor.deleteOwnedItem(item._id)
}
