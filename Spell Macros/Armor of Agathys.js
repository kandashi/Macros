//DAE Macro Execute, Effect Value = "Macro Name" @target @item.level
let target = canvas.tokens.get(args[1]); //grab target token

if (args[0] === "on") {
    let damage = (5 * args[2]); // calculate damage/tempHP values
    target.actor.update({ "data.attributes.hp.temp": damage }); // add tempHP
    target.actor.createOwnedItem({ // create item to deal damage to target, no "auto" damage

        "name": "Armor of Agathys",
        "type": "weapon",
        "data": {
            "ability": "",
            "actionType": "other",
            "attackBonus": 0,
            "chatFlavor": "Armor of Agathys damage",
            "critical": null,
            "damage": {
                "parts": [
                    [
                        `${damage}`,
                        "cold"
                    ]
                ],
                "versatile": ""
            },
            "formula": "",
            "save": {
                "ability": "",
                "dc": null,
                "scaling": "spell"
            },
            "armor": {
                "value": 10
            },
            "hp": {
                "value": 0,
                "max": 0,
                "dt": null,
                "conditions": ""
            },
            "weaponType": "natural",
            "proficient": true
        },
        "sort": 1000000,
        "flags": {
            "midi-qol": {
                "onUseMacroName": ""
            },
            "exportSource": {
                "world": "dae",
                "system": "dnd5e",
                "coreVersion": "0.7.7",
                "systemVersion": "1.1.1"
            }
        },
        "img": "icons/svg/mystery-man.svg",
        "effects": [],
        "_id": "WA41Lr2Wd4M7UJFm"
    });
}
if (args[0] === "off") {
    let item = target.actor.items.find(i => i.name === "Armor of Agathys"); // find item 
    item.delete(); //delete item
}