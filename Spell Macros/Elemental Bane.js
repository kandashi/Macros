//DAE Macro Execute, Effect Value = "Macro Name" @target 
let target = canvas.tokens.get(args[1])
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
                    let resistances = target.actor.data.data.traits.dr.value
                    const index = resistances.indexOf(element)
                    if (index !== undefined) {
                        resistances.splice(index, 1)
                        await target.actor.update({ "data.traits.dr.value": resistances });
                        target.actor.setFlag('world', 'ProtectionFromEnergy', element)
                    }
                    ChatMessage.create({ content: `${target.name} has elemental bane for ${element}` })
                }
            },
        },
    }).render(true);
}
if (args[0] === "off") {
    async function Off(){
    let element = await target.actor.getFlag('world', 'ProtectionFromEnergy');
    let resistances = target.actor.data.data.traits.dr.value
    if (element !== undefined) {
        resistances.push(element)
        target.actor.update({ "data.traits.dr.value": resistances });
    }
    ChatMessage.create({ content: `${target.name} has elemental bane for ${element} removed` })

}
Off()
}
