// //DAE Macro, no arguments
if(!game.modules.get("advanced-macros")?.active) {ui.notifications.error("Please enable the Advanced Macros module") ;return;}

const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const target = canvas.tokens.get(lastArg.tokenId)

if (args[0] === "on") {
    await DAE.setFlag(tactor, 'Holy Aura', target.data.dimLight)
    let light = (target.data.dimLight > 5) ? target.data.dimLight : 5
    target.update({ dimLight: light })
}

if (args[0] === "off") {
    let light = await DAE.getFlag(tactor, 'Holy Aura')
    await target.update({ dimLight: light })
    await DAE.unsetFlag(tactor, 'Holy Aura')
}