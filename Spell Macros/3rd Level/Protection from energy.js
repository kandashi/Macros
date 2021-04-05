//DAE  Macro, no arguments passed

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
      buttons: {
        yes: {
          icon: '<i class="fas fa-check"></i>',
          label: 'Yes',
          callback: (html) => {
            let element = html.find('#element').val();
            let resistances = tactor.data.data.traits.dr.value;
            resistances.push(element);
            tactor.update({ "data.traits.dr.value": resistances });
            DAE.setFlag(tactor, 'ProtectionFromEnergy', element);
            ChatMessage.create({ content: `${tactor.name} gains resistance to ${element}` });
          }
        },
      },
    }).render(true);
  }
  if (args[0] === "off") {
    let element = DAE.getFlag(tactor, 'ProtectionFromEnergy');
    let resistances = tactor.data.data.traits.dr.value;
    const index = resistances.indexOf(element);
    resistances.splice(index, 1);
    tactor.update({ "data.traits.dr.value": resistances });
    DAE.unsetFlag(tactor, 'ProtectionFromEnergy');
    ChatMessage.create({ content: `${tactor.name} loses resistance to ${element}`});
  }
