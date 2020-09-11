let target = canvas.tokens.get(args[1]);
let targetActor = target.actor;
let weapons = targetActor.items.filter(i => i.data.type === `weapon`);
let weapon_content = ``;
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");


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
                    console.log(html.find('[name=weapons]')[0].value);
                    let itemId = html.find('[name=weapons]')[0].value;
                    let item = targetActor.items.get(itemId);
                    let copy_item = duplicate(item);
                    function value_limit(val, min, max) {
                        return val < min ? min : (val > max ? max : val)
                    };
                    let spellLevel = Math.floor(args[2] / 2);
                    let bonus = value_limit(spellLevel, 1, 3);
                    let wpDamage = copy_item.data.damage.parts[0][0]
                    console.log(wpDamage)
                    console.log('bonus is ' + bonus)
                    ActorSetFlag.execute(args[1], `world`, `magicWeaponBonus`, bonus);
                    ActorSetFlag.execute(args[1],`world`, `magicWeaponItem`, itemId);
                    ActorSetFlag.execute(args[1],`world`, `magicWeaponDamage`, wpDamage);
                    copy_item.data.attackBonus = (copy_item.data.attackBonus + bonus)
                    copy_item.data.damage.parts[0][0] = (wpDamage + " +1")
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
    let wpDamage = target.actor.getFlag(`world`, `magicWeaponDamage`);
    let itemId = target.actor.getFlag(`world`, `magicWeaponItem`);
    let item = targetActor.items.get(itemId);
    let bonus = target.actor.getFlag(`world`, `magicWeaponBonus`);
    let copy_item = duplicate(item);
    copy_item.data.attackBonus = (copy_item.data.attackBonus - bonus);
    copy_item.data.damage.parts[0][0] = wpDamage
    targetActor.updateEmbeddedEntity("OwnedItem", copy_item);
    ActorUnSetFlag.execute(args[1], `world`, `magicWeaponBonus`);
    ActorUnSetFlag.execute(args[1],`world`, `magicWeaponItem`);
    ActorUnSetFlag.execute(args[1],`world`, `magicWeaponDamage`);
}