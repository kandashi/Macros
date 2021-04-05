//DAE macro
// effect 1: data.attributes.hp.max ADD  - @damage (the space is important)
// effect 2: call this macro, arguments : ability score to test,  DC to save against          eg.  wis, 15
// turn "stackable" on in the item effects

const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const target = canvas.tokens.get(lastArg.tokenId)

if(args[0] === "on"){
    const flavor = `${CONFIG.DND5E.abilities[`${args[1]}`]} DC${args[2]} Life Drain`;
    let saveRoll = (await tactor.rollAbilitySave(args[1], { flavor })).total;
    if(saveRoll < parseInt(args[2])) return

    tactor.deleteEmbeddedEntity("ActiveEffect", lastArg.efData._id)
}