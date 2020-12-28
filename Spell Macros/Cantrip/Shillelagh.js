let target = canvas.tokens.get(args[1]);
let weapons = target.actor.items.filter(i => i.data.type === `weapon`);
let weapon_content = ``;

for (let weapon of weapons) {
    weapon_content += `<option value=${weapon.id}>${weapon.name}</option>`;
}
if (args[0] === "on" && !target.getFlag('world', 'shillelagh')) {
    let content = `
<div class="form-group">
  <label>Weapons : </label>
  <select name="weapons">
    ${weapon_content}
  </select>
</div>`;

    new Dialog({
        title: "Choose a club or quarterstaff",
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
                    target.actor.setFlag(`world`, `shillelagh`, {
                        id : itemId,
                        damage : copy_item.data.damage.parts[0][0]    
                    });
                    let damage = copy_item.data.damage.parts[0][0];
                    var newdamage = damage.replace(/1d(4|6)/g,"1d8");
                    copy_item.data.damage.parts[0][0] = newdamage;
                    copy_item.data.ability = "wis";
                    target.actor.updateEmbeddedEntity("OwnedItem", copy_item);
                    ChatMessage.create({content: copy_item.name + " is empowered"});
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
    let flag = target.actor.getFlag(`world`, `shillelagh`);
    let itemId = flag.id;
    let damage = flag.damage;
    let item = target.actor.items.get(itemId);
    let copy_item = duplicate(item);
    copy_item.data.damage.parts[0][0] = damage;
    copy_item.data.ability = "";
    target.actor.updateEmbeddedEntity("OwnedItem", copy_item);
    target.actor.unsetFlag(`world`, `shillelagh`);
    ChatMessage.create({content: copy_item.name + " returns to normal"});

}
