let item = actor.items.find(i => i.name === `Unarmed Strike`);
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");

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
                        ActorSetFlag.execute(args[1],'world', 'AlterSelfSpell', copy_item.data.damage.parts[0][0])
                        copy_item.data.damage.parts[0][0] = "1d6 +@mod"
                        actor.updateEmbeddedEntity("OwnedItem", copy_item);
                        ChatMessage.create({content: "Unarmed strike is altered"})
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
    let damage = actor.getFlag('world', 'AlterSelfSpell')
debugger
    let copy_item = duplicate(item);
    copy_item.data.damage.parts[0][0] = damage
    actor.updateEmbeddedEntity("OwnedItem", copy_item);
    ActorUnSetFlag.execute(args[1],'world', 'AlterSelfSpell',);
    ChatMessage.create({ content: `Alter Self expired, unarmed strike returned` })
}