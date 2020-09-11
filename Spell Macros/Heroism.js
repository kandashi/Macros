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
let ActorUpdate = game.macros.getName("ActorUpdate");
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");


// get the hookId here
const hookIdFlag = ActorGetFlag.execute(args[1], "world", "heroismUpdateCombatHookId");

if (args[0] === "on" && !hookIdFlag) {
    const hookId = Hooks.on("updateCombat", (combat, update) => {
        if (!("round" in update || "turn" in update)) return;
        if (combat.combatant.tokenId === args[1]) {
            ActorUpdate.execute(args[1],{ "data.attributes.hp.temp": mod });
            ChatMessage.create({ content: "Heroism continues on " + target.name  })
        }
    });
    ActorSetFlag.execute(args[1], "world", "heroismUpdateCombatHookId", hookId);

}
if (args[0] === "off" && hookIdFlag) {
    Hooks.off("updateCombat", hookIdFlag);
    ActorUnSetFlag.execute(args[1], "world", "heroismUpdateCombatHookId");
}





let target = canvas.tokens.get(args[1]);
let mod = args[2];
let ActorUpdate = game.macros.getName("ActorUpdate");
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");
let ActorGetFlag = game.macros.getName("ActorSetFlag");

// get the hookId here
const hookIdFlag = ActorGetFlag.execute(args[1], "world", "heroismUpdateCombatHookId");
console.log(hookIdFlag)

if (args[0] === "on") {
ChatMessage.create({content : "testing" })
    const hookId = Hooks.on("updateCombat", (combat, update) => {
        if (!("round" in update || "turn" in update)) return;
        if (combat.combatant.tokenId === args[1]) {
            ActorUpdate.execute(args[1],{ "data.attributes.hp.temp": mod });
            ChatMessage.create({ content: "Heroism continues on " + target.name  })
        }
    });
    ActorSetFlag.execute(args[1], "world", "heroismUpdateCombatHookId", hookId);

}
if (args[0] === "off") {
ChatMessage.create({content : "off"});
    Hooks.off("updateCombat", hookIdFlag);
    ActorUnSetFlag.execute(args[1], "world", "heroismUpdateCombatHookId");
}