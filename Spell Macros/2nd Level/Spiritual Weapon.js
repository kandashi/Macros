//DAE Macro Execute, Effect Value = "Macro Name" @target @item.level @item

let target = canvas.tokens.get(args[1])

/**
 * Create Spiritual Weapon item in inventory
 */
if (args[0] === "on") {
  let damage = Math.floor((args[2] / 2));
  let attackMod = args[3].data.ability;
  let image = args[3].img;
  await target.actor.createOwnedItem(
    {
      "name": "Spiritual Weapon Summon",
      "type": "weapon",
      "data": {
        "equipped": true,
        "identified": true,
        "activation": {
          "type": "bonus",
        },
        "target": {
          "value": 1,
          "width": null,
          "type": "creature"
        },
        "range": {
          "value": 5,
          "units": "ft"
        },
        "ability": attackMod,
        "actionType": "msak",
        "attackBonus": "0",
        "chatFlavor": "",
        "critical": null,
        "damage": {
          "parts": [
            [
              `${damage}d8+@mod`,
              "force"
            ]
          ],
        },
        "weaponType": "simpleM",
        "proficient": true
      },
      "img": `${image}`,
    },
  );
}

// Delete meteors
if (args[0] === "off") {
  let item = target.actor.data.items.find(i => i.name === "Spiritual Weapon Summon")
  target.actor.deleteOwnedItem(item._id)
}
