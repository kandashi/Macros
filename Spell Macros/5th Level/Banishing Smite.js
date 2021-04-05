//DAE effects:
//  1: macro execute, Effect Value = (optional name of macro, leave blank for item macro) time-of-duration @attributes.spelldc @item.level
//  2: data.bonuses.mwak.damage, value = 5d10[force]
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
    const GMmacro = game.macros.getName("GM BanishingSmite")
    for (let smiteTarget of targets) {
        GMmacro.execute("apply", smiteTarget.id, timeRemaining, args[2])
    }
}


//GM macro
// Named = "GM SearingSmite"
let smiteTarget = canvas.tokens.get(args[1])

if (args[0] === "apply") {
    if(smiteTarget.actor.data.data.attributes.hp.value > 50) return;
    let effectData = {
        changes: [
            {
                key: "macro.execute",
                mode: 0,
                priority: 20,
                value: `"GM BanishingSmite" @token`,
            }
        ],
        label: "Banishing Smite",
        icon: "systems/dnd5e/icons/skills/emerald_09.jpg",
        duration: {
            "rounds": args[2],
        },
    }

    smiteTarget.actor.createEmbeddedEntity("ActiveEffect", effectData);
}

if (args[0] === "on") {
    smiteTarget.update({hidden : true}); // hide targeted token
    ChatMessage.create({content: smiteTarget.name + "  was banished"});
    
}
if(args[0]=== "off") {
    smiteTarget.update({hidden : false}); // unhide token
 ChatMessage.create({content: smiteTarget.name + "  returned"});
}