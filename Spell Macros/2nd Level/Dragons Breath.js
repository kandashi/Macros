//DAE Item Macro Execute, Effect Value = @item.level @attributes.spellcasting @attributes.spelldc
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const target = canvas.tokens.get(lastArg.tokenId)

const DAEitem = lastArg.efData.flags.dae.itemData

/**
 * Generates Dragons Breath item in targets inventory, when effect expires delete the item.
 */
debugger
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
            icon: '<i class="fas fa-fire"></i>',
            label: 'Select',
            callback: async (html) => {
              let element = html.find('#element').val();
              let damageDice = (args[1] +1);
              debugger
              await tactor.createOwnedItem({
                "name": "Dragons Breath",
                "type": "weapon",
                "data": {
                    "source": `Dragons Breath Spel}`,
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
                    "ability": args[2],
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
                    },
                    "save": {
                        "ability": "dex",
                        "dc": args[3],
                        "scaling": "flat"
                    },
                    "weaponType": "natural",
                    "proficient": true
                },
                "img": DAEitem.img,
                "flags": {
                  "DAESRD": {
                    "DragonsBreath": {
                      "ActorId": tactor._id
                    }
                  }
                }
            });
              ChatMessage.create({ content: `${target.name} gains Dragons Breath with ${damageDice}d6 ${element}` });
            }
          },
        },
      }).render(true);

}
if (args[0] === "off") {
    let item = tactor.data.items.find(i => i.flags?.DAESRD?.DragonsBreath?.ActorId === tactor._id);
    tactor.deleteOwnedItem(item._id);
}