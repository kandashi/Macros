//DAE Macro Execute, Effect Value = "Macro Name" @target @item.level
let target = canvas.tokens.get(args[1]);

/**
 * Generates Dragons Breath item in targets inventory, when effect expires delete the item.
 */
if (args[0] === "on") {
    new Dialog({
        title: 'Choose a damage type',
        content: `
            <form class="flexcol">
              <div class="form-group">
                <select id="element">
                  <option value="acid">Acid</option>
                  <option value="cold">Cold</option>
                  <option value="fire">Fire</option>
                  <option value="lightning">Lightning</option>
                  <option value="poison">Poison</option>
                </select>
              </div>
            </form>
          `,
        buttons: {
          yes: {
            icon: '<i class="fas fa-check"></i>',
            label: 'Yes',
            callback: async (html) => {
              let element = html.find('#element').val();
              let damageDice = (args[2] +1);
              let spellDC = args[3];
              await target.actor.createOwnedItem({
                "name": "Dragons Breath",
                "type": "weapon",
                "data": {
                    "description": {
                        "value": "",
                        "chat": "",
                        "unidentified": ""
                    },
                    "source": "",
                    "quantity": 1,
                    "activation": {
                        "type": "action",
                        "cost": 1,
                        "condition": ""
                    },
                    "target": {
                        "value": 15,
                        "width": null,
                        "units": "ft",
                        "type": "cone"
                    },
                    "ability": "",
                    "actionType": "save",
                    "attackBonus": 0,
                    "chatFlavor": "",
                    "critical": null,
                    "damage": {
                        "parts": [
                            [
                                `${damageDice}d6`,
                                `${element}`
                            ]
                        ],
                        "versatile": ""
                    },
                    "formula": "",
                    "save": {
                        "ability": "dex",
                        "dc": spellDC,
                        "scaling": "flat"
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
                "sort": 100000,
                "img": "systems/dnd5e/icons/skills/affliction_14.jpg",
            });
              ChatMessage.create({ content: `${target.name} gains Dragons Breath with ${damageDice}d6 ${element}` });
            }
          },
        },
      }).render(true);

}
if (args[0] === "off") {
    let item = target.actor.data.items.find(i => i.name === "Dragons Breath");
    target.actor.deleteOwnedItem(item._id);
}
