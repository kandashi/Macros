let target = canvas.tokens.get(args[1]);
let targetActor = target.actor;
let weapons = targetActor.items.filter(i => i.data.type === `weapon`);
let weapon_content = ``;
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");
let ActorGetFlag = game.macros.getName("ActorGetFlag");

for (let weapon of weapons) {
    weapon_content += `<option value=${weapon.id}>${weapon.name}</option>`;
}
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
                    let item = targetActor.items.get(itemId);
                    let copy_item = duplicate(item);
                    console.log(copy_item)
                    function value_limit(val, min, max) {
                        return val < min ? min : (val > max ? max : val)
                    };
                    let spellLevel = Math.floor(args[2] / 2);
                    let bonus = value_limit(spellLevel, 1, 3);
                    let wpDamage = copy_item.data.damage.parts[0][0]
                    ActorSetFlag.execute(args[1], `world`, `magicWeapon`, {
                        damage :bonus,
                        weapon : itemId,
                        weaponDmg : wpDamage,
                    });
                    copy_item.data.attackBonus = (copy_item.data.attackBonus + bonus)
                    copy_item.data.damage.parts[0][0] = (wpDamage + " + " + bonus)
                    targetActor.updateEmbeddedEntity("OwnedItem", copy_item);
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
    let flag = target.actor.getFlag('world','magicWeapon')
    let wpDamage = flag.weaponDmg
    let itemId = flag.weapon
    let item = target.actor.items.get(itemId);
    console.log(item)
    let bonus = flag.damage;
    let copy_item = duplicate(item);
    console.log(copy_item)
    copy_item.data.attackBonus = (copy_item.data.attackBonus - bonus);
    copy_item.data.damage.parts[0][0] = wpDamage
    targetActor.updateEmbeddedEntity("OwnedItem", copy_item);
    ActorUnSetFlag.execute(args[1], `world`, `magicWeapon`);    
}