//DAE Macro, no arguments
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const DAEItem = lastArg.efData.flags.dae.itemData

let weapons = tactor.items.filter(i => i.data.type === `weapon`);
let weapon_content = ``;

//Generate possible weapons
for (let weapon of weapons) {
    weapon_content += `<label class="radio-label">
    <input type="radio" name="weapon" value="${weapon.id}">
    <img src="${weapon.img}" style="border:0px; width: 50px; height:50px;">
    ${weapon.data.name}
  </label>`;
}
/**
 * Select weapon and update with 2d8 Radiant damage
*/
if (args[0] === "on") {
    let content = `<style>
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
    `;

    new Dialog({
        content,
        buttons:
        {
            Ok:
            {
                label: `Ok`,
                callback: (html) => {
                    let itemId = $("input[type='radio'][name='weapon']:checked").val();
                    let weapon = tactor.items.get(itemId);
                    let copyWeapon = duplicate(weapon);
                    let damageDice = copyWeapon.data.damage.parts
                    damageDice.push(["2d8", "radiant"])
                    copyWeapon.data.properties.mgc = true
                    tactor.updateEmbeddedEntity("OwnedItem", copyWeapon)
                    DAE.setFlag(tactor, 'holyWeapon', {
                        weaponId: itemId,
                        magic: weapon.data.data.properties.mgc
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
    debugger
    let flag = await DAE.getFlag(tactor, 'holyWeapon')
    let Weapon = tactor.items.get(flag.weaponId);
    let copy_item = duplicate(Weapon);
    let weaponDamageParts = copy_item.data.damage.parts;
    for (let i = 0; i < weaponDamageParts.length; i++) {
        if (weaponDamageParts[i][0] === "2d8" && weaponDamageParts[i][1] === "radiant") {
            weaponDamageParts.splice(i, 1)
            copy_item.data.properties.mgc = flag.magic
            tactor.updateEmbeddedEntity("OwnedItem", copy_item);
            DAE.unsetFlag(tactor, `elemntalWeapon`);
            return;
        }
    }
}
