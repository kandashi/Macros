let item = actor.items.find(i => i.name === `Unarmed Strike`);
let ActorSetFlag = game.macros.getName("TokenSetFlag");
let ActorUnSetFlag = game.macros.getName("TokenUnSetFlag");

console.log(item)
if (args[0] === "on") {
    if (token) {
        new Dialog({
            title: "Are you using Natural Weapons",
            content: "<p>Yes or no</p>",
            buttons: {
                one: {
                    label: "Yes",
                    callback: () => {
                        if (!item){
                            ChatMessage.create({content: "No unarmed strike found"})
                            return;
                        }
                        let copy_item = duplicate(item);
                        ActorSetFlag.execute(token,'world', 'AlterSelfSpell', item.data.data.damage.parts[0][0])
                        copy_item.data.data.damage.parts[0][0] = "1d6 +@mod"
                        actor.updateEmbeddedEntity("OwnedItem", copy_item);
                    }
                },
                    two: {
                        label: "No",
                        callback: () => ChatMessage.create({ content: `Unarmed strike not altered` })
                },
            }
        }).render(true);
    }
} 
if(args[0] === "off") {
    let damage = actor.getFlag('world', 'Alter self')
    let copy_item = duplicate(item);
    copy_item.data.data.damage.parts[0][0] = damage
    actor.updateEmbeddedEntity("OwnedItem", copy_item);
    ActorUnSetFlag.execute(token,'world', 'AlterSelfSpell',);
    ChatMessage.create({ content: `Alter Self expired, unarmed strike returned` })
}