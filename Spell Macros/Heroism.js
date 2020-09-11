let target = canvas.tokens.get(args[1]);
let mod = args[2];
if (args[0] === "on") {
    ChatMessage.create({ content: mod });
    const hookId = Hooks.on('updateCombat', async (combat, update) => {
        if (!("round" in update || "turn" in update)) return;
        if (combat.combatant.tokenId === args[1]) {
            target.actor.update({ "data.attributes.hp.temp": mod });
            ChatMessage.create({ content: target.name + " was healed" })
        }
    });
    target.setFlag('world', 'Heroism', hookId)
} else if (args[0] === "off" && target.getFlag('world', 'heroism')) {
    Hooks.off('updateCombat', target.getFlag('world', 'heroism'))
}


let target = canvas.tokens.get(args[1]);
let mod = args[2];
if (args[0] === "on") {
    const hookId = Hooks.on("updateCombat", () => {
        if (!("round" in update || "turn" in update)) return;
        if (combat.combatant.tokenId === args[1]) {
            target.actor.update({ "data.attributes.hp.temp": mod });
            ChatMessage.create({ content: target.name + " was healed" })
        }
    });
    Hooks.on("updateCombat", () => {
        if (!("round" in update || "turn" in update)) return;
        if (combat.combatant.tokenId === args[1]) {
            target.actor.update({ "data.attributes.hp.temp": mod });
            ChatMessage.create({ content: target.name + " was healed" })
        }
    });
    target.setFlag("world", "heroismUpdateCombatHookId", hookId);
} else if (args[0] === "off" && target.getFlag("world", "heroismUpdateCombatHookId")) {
    Hooks.off("updateCombat", target.getFlag("world", "heroismUpdateCombatHookId"));
}



let target = canvas.tokens.get(args[1]);
let mod = args[2];

// get the hookId here
const hookIdFlag = target.getFlag("world", "heroismUpdateCombatHookId");

// if we want to register, make sure the hook id doesn't already exist before registering again
if (args[0] === "on" && !hookIdFlag) {
    const hookId = Hooks.on("updateCombat", (combat, update) => {
        if (!("round" in update || "turn" in update)) return;
        if (combat.combatant.tokenId === args[1]) {
            target.actor.update({ "data.attributes.hp.temp": mod });
            ChatMessage.create({ content: target.name + " was healed" })
        }
    });
    target.setFlag("world", "heroismUpdateCombatHookId", hookId);
// if we want to unregister and the hookId has been saved
} else if (args[0] === "off" && hookIdFlag) {
    Hooks.off("updateCombat", hookIdFlag);
    // unset the saved hookId so that we can register again whent the time comes
    target.unsetFlag("world", "heroismUpdateCombatHookId");
}