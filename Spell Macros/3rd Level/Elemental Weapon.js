//DAE Macro, effect value = @item.level

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
  weapon_content += `<label class="radio-label">
  <input type="radio" name="weapon" value="${weapon.id}">
  <img src="${weapon.img}" style="border:0px; width: 50px; height:50px;">
  ${weapon.data.name}
</label>`;
}

/**
 * Updates selected weapon with selected element damage
 */
if (args[0] === "on") {
  new Dialog({
    title: 'Example',
    content: `
    <style>
    .magicWeapon .form-group {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        align-items: flex-start;
      }
      
      .magicWeapon .radio-label {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        justify-items: center;
        flex: 1 0 25%;
        line-height: normal;
      }
      
      .magicWeapon .radio-label input {
        display: none;
      }
      
      .magicWeapon img {
        border: 0px;
        width: 50px;
        height: 50px;
        flex: 0 0 50px;
        cursor: pointer;
      }
          
      /* CHECKED STYLES */
      .magicWeapon [type=radio]:checked + img {
        outline: 2px solid #f00;
      }
    </style>
    <form class="magicWeapon">
      <div class="form-group" id="weapons">
       ${weapon_content}
       </div>
    </form>
    <form>
      <select id="element">
        <option value="acid">Acid</option>
        <option value="cold">Cold</option>
        <option value="fire">Fire</option>
        <option value="lightning">Lightning</option>
        <option value="thunder">Thunder</option>
      </select>
    </form>
  `,
    buttons: {
      yes: {
        icon: '<i class="fas fa-check"></i>',
        label: 'Yes',
        callback: async (html) => {
          let weaponId = $("input[type='radio'][name='weapon']:checked").val();
          let element = html.find('#element').val();
          let dmgDice = (bonus + "d4");
          let weapon = tactor.items.get(weaponId);
          let copyWeapon = duplicate(weapon);
          copyWeapon.data.attackBonus = (copyWeapon.data.attackBonus + bonus);
          let damageDice = copyWeapon.data.damage.parts
          damageDice.push([dmgDice, element])
          console.log(copyWeapon)
          await tactor.updateEmbeddedDocuments("Item", [copyWeapon])
          await DAE.setFlag(tactor, 'elementalWeapon', {
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
      await tactor.updateEmbeddedDocuments("Item", [copy_item]);
      await DAE.unsetFlag(tactor, `elementalWeapon`);
      return;
    }
  }
}
