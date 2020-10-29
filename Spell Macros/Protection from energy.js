Main()
async function Main() {
  let target = canvas.tokens.get(args[1]);
  let ActorGetFlag = game.macros.getName("ActorGetFlag");
  let ActorSetFlag = game.macros.getName("ActorSetFlag");
  let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");

  if (args[0] === "on") {
    let d = new Dialog({
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
            let resistances = target.actor.data.data.traits.dr.value
            resistances.push(element)
            target.actor.update({ "data.traits.dr.value": resistances });
            ActorSetFlag.execute(args[1], 'world', 'ProtectionFromEnergy', element)
            ChatMessage.create({ content: target.name + " gains resistance to " + element })
          }
        },
      },
    }).render(true);
  }
  if (args[0] === "off") {
    let element = await ActorGetFlag.execute(args[1], 'world', 'ProtectionFromEnergy');
    let resistances = target.actor.data.data.traits.dr.value
    const index = resistances.indexOf(element)
    resistances.splice(index, 1)
    await target.actor.update({ "data.traits.dr.value": resistances });
    ActorUnSetFlag.execute(args[1], 'world', 'ProtectionFromEnergy')
    ChatMessage.create({ content: target.name + "loses resistance to " + element })
  }
}