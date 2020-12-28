//DAE Macro Execute, Effect Value = "Macro Name" @target

let target = canvas.tokens.get(args[1]);
let weapons = target.actor.items.filter(i => i.data.type === `weapon`);
let weapon_content = ``;

//Generate possible weapons
for (let weapon of weapons) {
    weapon_content += `<option value=${weapon.id}>${weapon.name}</option>`;
}
/**
 * Select weapon and update with 2d8 Radiant damage
*/
if (args[0] === "on") {
    let content = `
<div class="form-group">
  <label>Weapons : </label>
  <select name="weapons">
    ${weapon_content}
  </select>
</div>`;

    new Dialog({
        content,
        buttons:
        {
            Ok:
            {
                label: `Ok`,
                callback: (html) => {
                    let itemId = html.find('[name=weapons]')[0].value;
                    let weapon = target.actor.items.get(itemId);
                    let copyWeapon = duplicate(weapon);
                    let damageDice = copyWeapon.data.damage.parts
                    damageDice.push(["2d8", "radiant"])
                    target.actor.updateEmbeddedEntity("OwnedItem", copyWeapon)
                    target.actor.setFlag('world', 'holyWeapon', {
                        weaponId: itemId
                    })
                }
            },
            Cancel:
            {
                label: `Cancel`
            }
        }
    }).render(true);
}

if (args[0] === "off") {
    let flag = await target.actor.getFlag('world', 'elementalWeapon')
    let Weapon = flag.weaponId;
    let copy_item = duplicate(Weapon);
    let weaponDamageParts = copy_item.data.damage.parts;
    for (let i = 0; i < weaponDamageParts.length; i++) {
        if (weaponDamageParts[i][0] === "2d8" && weaponDamageParts[i][1] === "radiant") {
            weaponDamageParts.splice(i, 1)
            target.actor.updateEmbeddedEntity("OwnedItem", copy_item);
            target.actor.unsetFlag(`world`, `elemntalWeapon`);
            return;
        }
    }
}
