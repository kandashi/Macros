////DAE Macro, no arguments passed

const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const target = canvas.tokens.get(lastArg.tokenId)

const DAEItem = lastArg.efData.flags.dae.itemData

let caster = canvas.tokens.placeables.find(token => token?.actor?.items.get(DAEItem._id) != null)

if (args[0] === "on") {
    DAE.setFlag(tactor, "DeathWardIds", caster.actor.id)
    SetDeathWard()
}

if (args[0] === "off") {
        RemoveHook()
         DAE.unsetFlag(tactor, "WardingBondIds");
    console.log("Warding Bond removed");
}
if (args[0] === "each") {
        RemoveHook()
        SetDeathWard()
}

 function SetDeathWard() {
    const hookId = Hooks.on("preUpdateActor", async (actor, update, options, id) => {
        if (tactor.id !== actor.id) return
        let hp = getProperty(update, "data.attributes.hp.value");
        if (hp === 0) {
            debugger
            update.data.attributes.hp.value = 1;
            ChatMessage.create({ content: `Death Ward prevents ${actor.name} from dying` });
            let effect = actor.effects.find(i => i.data.label === "Death Ward");
            await actor.deleteEmbeddedEntity("ActiveEffect", effect.id)
        }
    });
    DAE.setFlag(tactor, "DeathWardHook", hookId);
}
async function RemoveHook() {
    let flag = await DAE.getFlag(tactor, 'DeathWardHook');
    Hooks.off("preUpdateActor", flag);
    await DAE.unsetFlag(tactor, "WardingBondHook");
}

