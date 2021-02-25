// //DAE item Macro 
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const target = canvas.tokens.get(lastArg.tokenId)

if (args[0] === "on") {
    DAE.setFlag(tactor, 'Holy Aura', target.data.dimLight)
    let light = (target.data.dimLight > 5) ? target.data.dimLight : 5
    target.update({ dimLight: light })
}

if (args[0] === "off") {
    async function off () {
        let light = await DAE.getFlag(tactor, 'Holy Aura')
        target.update({dimLight: light})
        DAE.unsetFlag(tactor, 'Holy Aura')
    }
    off()
}