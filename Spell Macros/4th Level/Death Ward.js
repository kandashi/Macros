////DAE Macro Execute, Effect Value = "Macro Name" @target

let target = canvas.tokens.get(args[1]);
let targetActor = game.actors.get(target.data.actorId);
if (args[0] === "on") {
    console.log("Death Ward set");
    
    // Sets the hook to read Update, if the token drops to 0hp it sets to 1hp, warns and removes hook
    const hookId = Hooks.on("preUpdateActor", (actor, update, options, id) => {
        let hp = getProperty(update, "data.attributes.hp.value");
        if (actor.data._id === targetActor._id && hp === 0) {
            update.data.attributes.hp.value = 1;
            ChatMessage.create({content: `Death Ward prevents ${actor.name} from dying`});
            let effect = actor.effects.find(i => i.data.label === "Death Ward");
            effect.delete();
        }
    });
    targetActor.setFlag("world", "DeathWard", hookId);
}

if (args[0] === "off") {
    async function DeathWardOff() {
        let flag = await targetActor.getFlag('world', 'DeathWard');
        Hooks.off("preUpdateActor", flag);
        targetActor.unsetFlag("world", "DeathWard");
        console.log("Death Ward removed");
    }
    DeathWardOff();
}

