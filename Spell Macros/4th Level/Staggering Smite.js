
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
    let effect = tactor.effects.find(i => i.data.label === "Staggering Smite");
    let changes = effect.data.changes;
    changes[1].value = `${args[2]}d6[radiant]`
    await effect.update({ changes });
}

if (args[0] === "off") {
    let timeRemaining = lastArg.efData.duration.rounds - (game.combats.active.current.round - lastArg.efData.duration.startRound)
    let targets = game.user.targets
    const GMmacro = game.macros.getName("GM SearingSmite")
    for (let smiteTarget of targets) {
        GMmacro.execute("apply", smiteTarget.id, timeRemaining, args[2])
    }
}


//GM macro
// Named = "GM SearingSmite"
let smiteTarget = canvas.tokens.get(args[1])
if (args[0] === "apply") {
    const flavor = `${CONFIG.DND5E.abilities["wis"]} DC${args[3]} ${"Staggering Smite"}`;
    let saveRoll = (await smiteTarget.actor.rollAbilitySave("con", { flavor })).total;
    if (saveRoll > args[3]) return;

    let effectData = {
        changes: [
            {
                key: "flags.midi-qol.disadvantage.attack.all",
                mode: 5,
                priority: 20,
                value: `1`,
            },
            {
                key: "flags.midi-qol.disadvantage.ability.check.all",
                mode: 5,
                priority: 20,
                value: `1`,
            }
        ],
        label: "Staggering Smite",
        icon: "systems/dnd5e/icons/skills/violet_10.jpg",
        duration: {
            "rounds": args[2],
        },
        flags:
        {
            dae: {
                specialDuration: ["turnEnd"]
            }
        }
    }

    smiteTarget.actor.createEmbeddedEntity("ActiveEffect", effectData);
}

