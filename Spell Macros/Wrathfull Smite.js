
//DAE effects:
//  1: macro execute, Effect Value = (optional name of macro, leave blank for item macro) time-of-duration
//  2: data.bonuses.mwak.damage, value = 1d6[psychic]
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
    let targets = Array.from(game.user.targets)
    const GMmacro = game.macros.getName("GM WrathfullSmite")
    for (let smiteTarget of targets) {
        GMmacro.execute("apply", smiteTarget.id, timeRemaining, args[2])
    }
}


//GM macro
// Named = "GM WrathfullSmite"
let smiteTarget = canvas.tokens.get(args[1])
if (args[0] === "each") {
    const flavor = `Use action to roll ${CONFIG.DND5E.abilities["wis"]} DC${args[3]} ${"Wrathfull Smite"}`;
    let saveRoll = (await smiteTarget.actor.rollAbilitySave("wis", { flavor })).total;
    if (saveRoll < args[3]) {
        await game.cub.removeCondition("Frightened", smiteTarget)
    }
    return;
}


if (args[0] === "apply") {

    const flavor = `${CONFIG.DND5E.abilities["wis"]} DC${args[3]} ${"Wrathfull Smite"}`;
    let saveRoll = (await smiteTarget.actor.rollAbilitySave("wis", { flavor })).total;
    if (saveRoll > args[3]) return;

    await game.cub.addCondition("Frightened", smiteTarget)

    let effectData = {
        changes: [
            {
                key: "macro.execute",
                mode: 0,
                priority: 20,
                value: `"GM WrathfullSmite" @token null ${args[3]}`,
            }
        ],
        label: "Wrathfull Smite",
        icon: "",
        duration: {
            "rounds": args[2],
        },
        flags: {
            dae: {
                macroRepeat: "startEveryTurn"
            }
        }
    }

    smiteTarget.actor.createEmbeddedEntity("ActiveEffect", effectData);
}