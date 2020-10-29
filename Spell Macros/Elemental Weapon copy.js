let target = canvas.tokens.get(args[1]);
let targetActor = target.actor;
let weapons = targetActor.items.filter(i => i.data.type === `weapon`);
let weapon_content = ``;
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");
let ActorGetFlag = game.macros.getName("ActorGetFlag");

var bonus = ''
if (args[2] < 4) let bonus = 1;
if (args[2] < 7) let bonus = 2;
if (args[2] >= 7) let bonus = 3;

for (let weapon of weapons) {
  weapon_content += `<option value=${weapon.id}>${weapon.name}</option>`;
}
if (args[0] === "on") {
  let d = new Dialog({
    title: 'Example',
    content: `
          <form class="flexcol">
            <div class="form-group">
              <select id="weapon">
              ${weapon_content}
              </select>
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
          let weaponId = html.find('#weapon').val();
          let element = html.find('#element').val();
          let dmgDice = (bonus + "d4");
          let weapon = targetActor.items.get(weaponId);
          let copyWeapon = duplicate(item);
          copyWeapon.data.attackBonus = (copyWeapon.attackBonus + bonus);
          let damageDice = copyWeapon.data.damage.parts
          damageDice.push([dmgDice, element])
          targetActor.updateEmbeddedEntity("OwnedItem", copyWeapon)
          ActorSetFlag.execute(args[1], 'world', 'elementalWeapon', {
            attack : bonus,
            elementType : element,
            weaponID : weaponId
          })          
        }
      },
    },
  }).render(true);
}

if (args[0] === "off") {
  let flag = ActorGetFlag.execute(args[1], 'world', 'elementalWeapon')
  let bonusRemoval = flag.attack;
  let weaponId = flag.weaponID;
  let element = flag.elementType
  let Weapon = targetActor.items.get(itemId);
  let copy_item = duplicate(item);
  copyWeapon.data.attackBonus = (copyWeapon.attackBonus - bonus);
  let weaponDamageParts = copyWeapon.data.damage.parts;
  const index = weaponDamageParts.indexOf(element)
  weapongDamageParts.splice(index, 1)
  targetActor.updateEmbeddedEntity("OwnedItem", copy_item);
  ActorUnSetFlag.execute(args[1], `world`, `elemntalWeapon`);
}

