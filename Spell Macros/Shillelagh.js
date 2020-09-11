let target = canvas.tokens.get(args[1]);
let weapons = target.actor.items.filter(i => i.data.type === `weapon`);
let weapon_content = ``;
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");
let ActorSetFlag = game.macros.getName("ActorSetFlag");


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
                    console.log(html.find('[name=weapons]')[0].value);
                    let itemId = html.find('[name=weapons]')[0].value;
                    let item = token.actor.items.get(itemId);
                    console.log(item)
                    let copy_item = duplicate(item);
                    ActorSetFlag.execute(args[1], `world`, `shillelagh`, itemId);
                    copy_item.data.damage.parts[0][0] = "1d8 +@mod";
                    copy_item.data.ability = "wis"
                    target.actor.updateEmbeddedEntity("OwnedItem", copy_item);
                    ChatMessage.create({content: copy_item.name + " is empowered"})
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
    let itemId = target.actor.getFlag(`world`, `shillelagh`);
    let item = token.actor.items.get(itemId);
    let copy_item = duplicate(item);
    copy_item.data.damage.parts[0][0] = "1d6 +@mod";
    copy_item.data.ability = ""
    target.actor.updateEmbeddedEntity("OwnedItem", copy_item);
    ActorUnSetFlag.execute(args[1], `world`, `shillelagh`);
    ChatMessage.create({content: copy_item.name + " returns to normal"})

}