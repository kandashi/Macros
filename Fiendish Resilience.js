console.log("Fiendish Resiliance hook active")
function fiendishResilience (actorData, a) {
    let actor = game.actors.get(actorData.actor.data._id)
    let feature = actor.items.find(i => i.name === "Fiendish Resilience")
    if (feature !== null) {
        // Dialog to select damage type for the new day
        new Dialog({
            title: 'Fiendish Resilience',
            content: `
              <form class="flexcol">
                <div class="form-group">
                  <select id="element">
                    <option value="acid">Acid</option>
                    <option value="bludgeoning">Bludgeoning</option>
                    <option value="cold">Cold</option>
                    <option value="fire">Fire</option>
                    <option value="force">Force</option>
                    <option value="lightning">Lightning</option>
                    <option value="necrotic">Necrotic</option>
                    <option value="piercing">Piercing</option>
                    <option value="poison">Poison</option>
                    <option value="psychic">Psychic</option>
                    <option value="radiant">Radiant</option>
                    <option value="slashing">Slashing</option>
                    <option value="thunder">Thunder</option>
                  </select>
                </div>
              </form>
            `,
            buttons: {
                one: {
                    icon: '<i class="fas fa-check"></i>',
                    label: 'Apply',
                    callback: (html) => {
                        /// if the actor already has a Fiendish Resilience resistance on selection of the new resistance it will 
                        
                        if (actor.getFlag('world', 'FiendishResilience')) {
                            let obj = {};
                            let oldElement = actor.getFlag('world', 'FiendishResilience')
                            let newResistance = duplicate(actor.data.data.traits.dr);
                            const index = newResistance.value.indexOf(oldElement)
                            newResistance.value.splice(index, 1)
                            let element = html.find('#element').val();
                            if (newResistance.value.indexOf(element) === -1) newResistance.value.push(element);
                            obj['data.traits.dr'] = newResistance;
                            actor.update(obj);
                            actor.setFlag('world', 'FiendishResilience', element)
                            ChatMessage.create({ content: actor.data.name + " looses resistance to " + oldElement })
                        } else {
                            let obj = {};
                            let element = html.find('#element').val();
                            let newResistance = duplicate(actor.data.data.traits.dr);
                            if (newResistance.value.indexOf(element) === -1) newResistance.value.push(element);
                            obj['data.traits.dr'] = newResistance;
                            actor.update(obj);
                            actor.setFlag('world', 'FiendishResilience', element)
                            ChatMessage.create({ content: actor.data.name + " gains resistance to " + element })
                        }
                    }
                },
                two: {
                    label: 'Cancel',
                    callback: () => ChatMessage.create({ content: "Fiendish Resilience is not changed" })
                }
            },
        }).render(true);
    }
}

Hooks.on("closeLongRestDialog", fiendishResilience);
Hooks.on("closeShortRestDialog", fiendishResilience);
