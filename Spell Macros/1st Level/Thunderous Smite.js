
//DAE effects:
//  1: macro execute, Effect Value = (optional name of macro, leave blank for item macro) time-of-duration @item.level
//  2: data.bonuses.mwak.damage, value = 2d6[thunder]
// Special Expiry set to 1 hit
// Target - Self, clear all spell effects in the Action field including any saves or damage

// Create 2 macros, one for the client and one for the GM side, give the GM macro "Run as GM" permissions from furnace

//Client side macro, to be called by the DAE effect
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);


if (args[0] === "off") {
    let timeRemaining = lastArg.efData.duration.rounds - (game.combats.active.current.round - lastArg.efData.duration.startRound)
    let targets = game.user.targets
    const GMmacro = game.macros.getName("GM ThunderousSmite")
    for (let smiteTarget of targets) {
        GMmacro.execute("apply", smiteTarget.id, timeRemaining, args[2])
    }
}


//GM macro
// Named = "GM ThunderousSmite"
let smiteTarget = canvas.tokens.get(args[1])
if (args[0] === "apply") {
    const flavor = `${CONFIG.DND5E.abilities["str"]} DC${args[3]} ${"Thunderous Smite"}`;
    let saveRoll = (await smiteTarget.actor.rollAbilitySave("str", {flavor})).total;
if(saveRoll > args[3]) return;
    ChatMessage.create({content : `${smiteTarget.name} is pushed 10ft away`})
    game.cub.addCondition("Prone", smiteTarget)
}

