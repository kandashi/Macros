//DAE Macro Execute, Effect Value = "Macro Name" @target

let target = canvas.tokens.get(args[1]);
let weapons = target.actor.items.filter(i => i.data.type === `weapon`);
let weapon_content = ``;
function value_limit(val, min, max) {
    return val < min ? min : (val > max ? max : val);
};

//Filter for weapons
for (let weapon of weapons) {
    weapon_content += `<option value=${weapon.id}>${weapon.name}</option>`;
}

/**
 * Select for weapon and apply bonus based on spell level
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
                    let item = target.actor.items.get(itemId);
                    let copy_item = duplicate(item);
                    let spellLevel = Math.floor(args[2] / 2);
                    let bonus = value_limit(spellLevel, 1, 3);
                    let wpDamage = copy_item.data.damage.parts[0][0];
                    target.actor.setFlag(`world`, `magicWeapon`, {
                        damage: item.data.attackBonus,
                        weapon: itemId,
                        weaponDmg: wpDamage,
                    }
                    );
                    copy_item.data.attackBonus = (copy_item.data.attackBonus + bonus);
                    copy_item.data.damage.parts[0][0] = (wpDamage + " + " + bonus);
                    target.actor.updateEmbeddedEntity("OwnedItem", copy_item);
                }
            },
            Cancel:
            {
                label: `Cancel`
            }
        }
    }).render(true);
}

//Revert weapon and unset flag.
if (args[0] === "off") {
    let { damage, weapon, weaponDmg } = target.actor.getFlag('world', 'magicWeapon');
    let item = target.actor.items.get(weapon);
    let copy_item = duplicate(item);
    copy_item.data.attackBonus = (copy_item.data.attackBonus - damage);
    copy_item.data.damage.parts[0][0] = weaponDmg;
    target.actor.updateEmbeddedEntity("OwnedItem", copy_item);
    target.actor.unsetFlag(`world`, `magicWeapon`);
}