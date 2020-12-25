//DAE Macro Execute, Effect Value = "Macro Name" (time of duration) @attributes.spelldc
// Target - Self, clear all spell effects in the Action field

if (args[0] === "off") {
    let effect = actor.effects.find(i => i.data.label === "Searing Smite");
    let timeRemaining = args[1] - (effect.duration.duration - effect.duration.remaining);
    let gameUser = game.users.find(u => u.data.character === actor._id)
    let targets = gameUser.targets
    for (let smiteTarget of targets) {
        let effectData = {
            changes: [],
            label: "Searing Smite DoT",
            icon: "systems/dnd5e/icons/skills/yellow_19.jpg",
            duration: {
                "seconds": timeRemaining,
            },
        }
        smiteTarget.actor.createEmbeddedEntity("ActiveEffect", effectData);
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
            let effect = smiteTarget.effects.find(i => i.data.label === "Searing Smite DoT");
            effect.delete()
            let flag = await smiteTarget.getFlag("world", "SearingSmite");
            Hooks.off("updateCombat", flag.hook)
            smiteTarget.unsetFlag("world", "SearingSmite")
        });
    }
}