//DAE Macro, Either ItemMacro or MacroExecute
// Item -> self target, duration of 1 round, special expiry of "next hit"
// 
// DAE 3 effects: 1 -> damage resistance (any type)
//               2 -> bonus melee damage (no value)
//               3 -> item macro with value of @item.level
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);

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
        //select element type
        buttons: {
            yes: {
                icon: '<i class="fas fa-bolt"></i>',
                label: 'Select',
                callback: async (html) => {
                    let element = html.find('#element').val();
                    let effect =  tactor.effects.find(i => i.data.label === "Absorb Elements");
                    let changes = effect.data.changes;
                    changes[0].value = element;
                    changes[1].value = `${args[1]}d6[${element}]`
                    await effect.update({changes});
                },
            },
        }
    }).render(true);
}

