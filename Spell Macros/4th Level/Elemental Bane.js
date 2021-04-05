//DAE  Macro, no arguments passed

const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const target = canvas.tokens.get(lastArg.tokenId)

/**
 * Adds selected damage resistance to target, set flag for resistance, then remove.
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
                  <option value="thunder">Thunder</option>
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
                    let resistances = tactor.data.data.traits.dr.value;
                    const index = resistances.indexOf(element);
                    if (index !== -1) {
                        resistances.splice(index, 1);
                        await tactor.update({ "data.traits.dr.value": resistances });
                        DAE.setFlag(tactor, 'ElementalBane', element);
                    }
                    ChatMessage.create({ content: `${tname} has elemental bane for ${element}` });
                }
            },
        },
    }).render(true);
}
if (args[0] === "off") {
    let element = await DAE.getFlag(tactor, 'ElementalBane');
    let resistances = tactor.data.data.traits.dr.value;
    if (element !== undefined) {
        resistances.push(element);
        tactor.update({ "data.traits.dr.value": resistances });
    }
    ChatMessage.create({ content: `${tname} has elemental bane for ${element} removed` });
}
