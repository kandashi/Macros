//DAE Macro Execute, Effect Value = "Macro Name" @target
let target = canvas.tokens.get(args[1]);

/**
 * Set hooks to fire on combat update and world time update
 */
if (args[0] === "on") {

    // If combatant is effected, update HP by 1
    const hookId = Hooks.on("updateCombat", (combat, updates, options, id) => {
        if (combat.combatant.actor.id === target.actor.id) {
            target.actor.applyDamage(-1);
            ChatMessage.create({ content: `${target.actor.name} gains 1 hp` });
        }
    },
    );

    // If 6s elapses, update HP by one
    const timeHookId = Hooks.on("updateWorldTime", (currentTime, updateInterval) => {
        if (game.combats === []) return;
        let effect = target.actor.effects.find(i => i.data.label === "Regenerate");
        let applyTime = effect.data.duration.startTime;
        let expireTime = applyTime + effect.data.duration.seconds;
        let healing = roundCount(currentTime, updateInterval, applyTime, expireTime);
        console.log(`${target.name} healed for ${healing}`);
        target.actor.applyDamage(-healing);
    }
    );

    target.actor.setFlag("world", "Regenerate", {
        combatHook: hookId,
        timeHook: timeHookId
    }
    );
}

if (args[0] === "off") {
    async function RegenerateOff() {
        let flag = await target.actor.getFlag('world', 'Regenerate');
        Hooks.off("updateCombat", flag.combatHook);
        Hooks.off("updateWorldTime", flag.timeHook);
        target.actor.unsetFlag("world", "Regenerate");
        console.log("Regenerate removed");
    };
    RegenerateOff();
}


/**
 * 
 * @param {Number} currentTime current world time
 * @param {Number} updateInterval amount the world time was incremented
 * @param {Number} applyTime time the effect was applied
 * @param {Number} expireTime time the effect should expire
 */
function roundCount(currentTime, updateInterval, applyTime, expireTime) {
    // Don't count time before applyTime
    if (currentTime - updateInterval < applyTime) {
        let offset = applyTime - (currentTime - updateInterval);
        updateInterval -= offset;
    }

    // Don't count time after expireTime
    if (currentTime > expireTime) {
        let offset = currentTime - expireTime;
        currentTime = expireTime;
        updateInterval -= offset;
    }

    let sTime = currentTime - updateInterval;
    let fRound = sTime + 6 - (sTime % 6); // Time of the first round
    let lRound = currentTime - (currentTime % 6); // Time of the last round
    let roundCount = 0;
    if (lRound >= fRound)
        roundCount = (lRound - fRound) / 6 + 1;

    return roundCount;
}