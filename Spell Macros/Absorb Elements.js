

let target = canvas.tokens.get(args[1]);
let ActorGetFlag = game.macros.getName("ActorGetFlag");
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");

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
                    
                    let res =  target.actor.effects.find(i => i.data.label === "Absorb Elements R");
                    let changes = res.data.changes;
                    changes[0].value = element
                    await res.update({changes});

                    let weapons = target.actor.items.filter(i => i.data.type === `weapon`);
                    for (let weapon of weapons) {
                        if(weapon.data.data.actionType === "mwak"){
                        let dice = `${args[2]}d6`
                        let copyWeapon = duplicate(weapon);
                        let damageDice = copyWeapon.data.damage.parts
                        damageDice.push([dice, element])
                        await target.actor.updateEmbeddedEntity("OwnedItem", copyWeapon)
                        }
                    }

                    ActorSetFlag.execute(args[1], 'world', 'AbsorbElements', "on")
                },
            },
        }
    }).render(true);
}
if (args[0] === "off") {
    async function remove() {
        let weapons = target.actor.items.filter(i => i.data.type === `weapon`);
        for (let weapon of weapons) {
            if(weapon.data.data.actionType === "mwak"){
            let copyWeapon = duplicate(weapon);
            let damageRow = copyWeapon.data.damage.parts.length - 1
            copyWeapon.data.damage.parts.splice(damageRow, 1)
            await target.actor.updateEmbeddedEntity("OwnedItem", copyWeapon)
            }
        }
    }
    remove();
    ActorUnSetFlag.execute(args[1], 'world', 'AbsorbElements')
}
