//DAE Macro Execute, Effect Value = "Macro Name" @target 

let target = canvas.tokens.get(args[1]); //grab target token
let item = target.actor.items.find(i => i.name === `Unarmed Strike`); // find unarmed strike attack
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");

if (args[0] === "on") {
    if (target) {
        new Dialog({
            title: "Are you using Natural Weapons",
            content: "<p>Yes or no</p>",
            buttons: {
                one: {
                    label: "Yes",
                    callback: () => {
                        if (!item){
                            ChatMessage.create({content: "No unarmed strike found"}); // exit out if no unarmed strike
                            return;
                        }
                        let copy_item = duplicate(item);
                        ActorSetFlag.execute(args[1],'world', 'AlterSelfSpell', copy_item.data.damage.parts[0][0]); //set flag of previous value
                        copy_item.data.damage.parts[0][0] = "1d6 +@mod"; //replace with new value
                        target.actor.updateEmbeddedEntity("OwnedItem", copy_item); //update item
                        ChatMessage.create({content: "Unarmed strike is altered"});
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
    let damage = actor.getFlag('world', 'AlterSelfSpell'); // find flag with previous values
    let copy_item = duplicate(item);
    copy_item.data.damage.parts[0][0] = damage; //replace with old value
    target.actor.updateEmbeddedEntity("OwnedItem", copy_item); //update item
    ActorUnSetFlag.execute(args[1],'world', 'AlterSelfSpell',); //remove flag
    ChatMessage.create({ content: `Alter Self expired, unarmed strike returned` });
}