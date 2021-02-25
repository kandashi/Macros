//DAE Item Macro Execute

const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const target = canvas.tokens.get(lastArg.tokenId)
const DAEItem = lastArg.efData.flags.dae.itemData


let weapons = tactor.items.filter(i => i.data.type === `weapon`);
var weapon_content = ``, bonus = ``;
if (DAEItem.data.level >= 7) bonus = 3;
else if (DAEItem.data.level < 7) bonus = 2;
else if (DAEItem.data.level < 4) bonus = 1;

for (let weapon of weapons) {
  weapon_content += `<option value=${weapon.id}>${weapon.name}</option>`;
}

/**
 * Updates selected weapon with selected element damage
 */
if (args[0] === "on") {
  new Dialog({
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
          let weapon = tactor.items.get(weaponId);
          let copyWeapon = duplicate(weapon);
          copyWeapon.data.attackBonus = (copyWeapon.attackBonus + bonus);
          let damageDice = copyWeapon.data.damage.parts
          damageDice.push([dmgDice, element])
          tactor.updateEmbeddedEntity("OwnedItem", copyWeapon)
          DAE.setFlag(tactor, 'elementalWeapon', {
            diceNum: dmgDice,
            attack: bonus,
            elementType: element,
            weaponID: weaponId
          })
        }
      },
    },
  }).render(true);
}

if (args[0] === "off") {
  let flag = await DAE.getFlag(tactor, 'elementalWeapon')
  let { diceNum, attack, elementType, weaponID } = flag
  let Weapon = tactor.items.get(weaponID);
  let copy_item = duplicate(Weapon);
  copy_item.data.attackBonus = (copy_item.attackBonus - attack);
  let weaponDamageParts = copy_item.data.damage.parts;
  for (let i = 0; i < weaponDamageParts.length; i++) {
    if (weaponDamageParts[i][0] === diceNum && weaponDamageParts[i][1] === elementType){
      weaponDamageParts.splice(i, 1)
      tactor.updateEmbeddedEntity("OwnedItem", copy_item);
      DAE.unsetFlag(tactor, `elemntalWeapon`);
      return;
    }
  }
}

