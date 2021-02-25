//DAE Item Macro Execute
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const DAEItem = lastArg.efData.flags.dae.itemData

let weapons = tactor.items.filter(i => i.data.type === `weapon`);
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
                    let weaponItem = tactor.items.get(itemId);
                    let copy_item = duplicate(weaponItem);
                    let spellLevel = Math.floor(DAEItem.data.level / 2);
                    let bonus = value_limit(spellLevel, 1, 3);
                    let wpDamage = copy_item.data.damage.parts[0][0];
                    let verDamage = copy_item.data.damage.versatile;
                    DAE.setFlag(tactor, `magicWeapon`, {
                        damage: weaponItem.data.data.attackBonus,
                        weapon: itemId,
                        weaponDmg: wpDamage,
                        verDmg: verDamage,
                    }
                    );
                    copy_item.data.attackBonus = `${parseInt(copy_item.data.attackBonus) + bonus}`;
                    copy_item.data.damage.parts[0][0] = (wpDamage + " + " + bonus);
                    if(verDamage !== "" && verDamage !== null) copy_item.data.damage.versatile = (verDamage + " + " + bonus);
                    tactor.updateEmbeddedEntity("OwnedItem", copy_item);
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
    let { damage, weapon, weaponDmg, verDmg } = DAE.getFlag(tactor, 'magicWeapon');
    let weaponItem = tactor.items.get(weapon);
    let copy_item = duplicate(weaponItem);
    copy_item.data.attackBonus = `${parseInt(copy_item.data.attackBonus) - damage}`;
    copy_item.data.damage.parts[0][0] = weaponDmg;
    if(verDmg !== "" && verDmg !== null) copy_item.data.damage.versatile = verDmg;
    tactor.updateEmbeddedEntity("OwnedItem", copy_item);
    DAE.unsetFlag(tactor, `magicWeapon`);
}