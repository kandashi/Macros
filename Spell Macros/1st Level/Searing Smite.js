
//DAE effects:
//  1: macro execute, Effect Value = (optional name of macro, leave blank for item macro) time-of-duration @attributes.spelldc @item.level
//  2: data.bonuses.mwak.damage, value = blank
// Special Expiry set to 1 hit
// Target - Self, clear all spell effects in the Action field including any saves or damage

// Create 2 macros, one for the client and one for the GM side, give the GM macro "Run as GM" permissions from furnace

//Client side macro, to be called by the DAE effect
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);

if(args[0] === "on"){
    let effect =  tactor.effects.find(i => i.data.label === "Searing Smite");
    let changes = effect.data.changes;
    changes[1].value = `${args[3]}d6[fire]`
    await effect.update({changes});
}

if (args[0] === "off") {
    let timeRemaining = lastArg.efData.duration.rounds - (game.combats.active.current.round - lastArg.efData.duration.startRound)
    let gameUser = game.users.find(u => u.data.character === actor._id)
    let targets = gameUser.targets
    const GMmacro = game.macros.getName("GM SearingSmite")
    for (let smiteTarget of targets) {
        GMmacro.execute("apply", smiteTarget.id, timeRemaining, args[2])
    }
}


//GM macro
// Named = "GM SearingSmite"
let smiteTarget = canvas.tokens.get(args[1])
if (args[0] === "each") {
    const flavor = `${CONFIG.DND5E.abilities["con"]} DC${args[3]} ${"Searing Smite"}`;
    let saveRoll = (await smiteTarget.actor.rollAbilitySave("con", {flavor})).total;
    if (saveRoll < args[3]) {
        let roll = new Roll("1d6").roll().total;
        let targets = new Set();
        let saves = new Set();
        targets.add(smiteTarget);
        saves.add(targets);
        MidiQOL.applyTokenDamage([{ damage: roll, type: "fire" }], roll, targets, [], saves);;
    }
    return;
}


if (args[0] === "apply") {
    let effectData = {
        changes: [
            {
                key: "macro.execute",
                mode: 0,
                priority: 20,
                value: `"GM SearingSmite" @token null ${args[3]}`,
            }
        ],
        label: "Searing Smite DoT",
        icon: "systems/dnd5e/icons/skills/yellow_19.jpg",
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
/*
const hookId = Hooks.on("updateCombat", (combat, changed, options, userId) => {

    if (!("turn" in changed)) return;

    if (combat.combatant.tokenId === smiteTarget.data._id && smiteTarget.actor.effects.find(i => i.data.label === "Searing Smite DoT")) {
        let saveRoll = smiteTarget.actor.rollAbilitySave("con");
        if (saveRoll.total < args[2]) {
            let roll = new Roll("1d6").roll().total;
            let targets = new Set();
            let saves = new Set();
            targets.add(smiteTarget);
            saves.add(targets);
            MidiQOL.applyTokenDamage([{ damage: roll, type: "fire" }], 10, targets, [], saves);;
        }
    }
});

smiteTarget.setFlag("world", "SearingSmite", {
    hook: hookId,
});

game.Gametime.doIn({ seconds: timeRemaining }, async () => {

});*/