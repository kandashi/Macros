
//DAE effects:
//  1: macro execute, Effect Value = (optional name of macro, leave blank for item macro) time-of-duration @item.level
//  2: data.bonuses.mwak.damage, value = blank
// Special Expiry set to 1 hit
// Target - Self, clear all spell effects in the Action field including any saves or damage

// Create 2 macros, one for the client and one for the GM side, give the GM macro "Run as GM" permissions from furnace

//Client side macro, to be called by the DAE effect
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);

if (args[0] === "on") {
    let effect = tactor.effects.find(i => i.data.label === "Branding Smite");
    let changes = effect.data.changes;
    changes[1].value = `${args[2]}d6[radient]`
    await effect.update({ changes });
}

if (args[0] === "off") {
    let timeRemaining = lastArg.efData.duration.rounds - (game.combats.active.current.round - lastArg.efData.duration.startRound)
    let gameUser = game.users.find(u => u.data.character === actor._id)
    let targets = gameUser.targets
    const GMmacro = game.macros.getName("GM BrandingSmite")
    for (let smiteTarget of targets) {
        GMmacro.execute("apply", smiteTarget.id, timeRemaining)
    }
}


//GM macro
// Named = "GM BrandingSmite"

let smiteTarget = canvas.tokens.get(args[1])

if (args[0] === "apply") {
    let effectData = {
        changes: [
            {
                key: "macro.execute",
                mode: 0,
                priority: 20,
                value: `"GM BrandingSmite" @token null ${args[3]}`,
            }
        ],
        label: "Branding Smite Application",
        icon: "systems/dnd5e/icons/spells/explosion-sky-3.jpg",
        duration: {
            "rounds": args[2],
        },
    }

    smiteTarget.actor.createEmbeddedEntity("ActiveEffect", effectData);
    if (smiteTarget.data.dimLight < 5) {
        smiteTarget.update({ dimLight: 5 })

    }
}

if (args[0] === "off") {
    const lastArg = args[args.length - 1];
    let smiteTarget = canvas.tokens.get(lastArg.tokenId)
    if (smiteTarget.data.dimLight === 5) {
        smiteTarget.update({ dimLight: 0 })

    }
}

