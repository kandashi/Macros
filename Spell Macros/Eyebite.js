let target = canvas.tokens.get(args[1]);
let ConditionControl = game.macros.getName("CUB Condition");

/**
 * Dialog appears on players screen, CondtionControll callback execute on GM end 
 */

function EyebiteDialog() {
    new Dialog({
        title: "Eyebite options",
        content: "<p>Target a token and select the effect</p>",
        buttons: {
            one: {
                label: "Asleep",
                callback: async () => {
                    for (let target of game.user.targets) {
                        let { total } = await target.actor.rollAbilitySave("wis");
                        if (total < args[2]) {
                            ChatMessage.create({ content: target.name + " failed the save with a " + total });
                            ConditionControl.execute("apply", "Unconscious", target);
                        }
 else {
                            ChatMessage.create({ content: target.name + " passed the save with a " + total });
                        }
                    }
                }
            },
            two: {
                label: "Panicked",
                callback: async () => {
                    for (let target of game.user.targets) {
                        let { total } = await target.actor.rollAbilitySave("wis");
                        if (total < args[2]) {
                            ChatMessage.create({ content: target.name + " failed the save with a " + total });
                            ConditionControl.execute("apply", "Frightened", target);
                        }
 else {
                            ChatMessage.create({ content: target.name + " passed the save with a " + total });
                        }
                    }
                }
            },
            three: {
                label: "Sickened",
                callback: async () => {
                    for (let target of game.user.targets) {
                        let { total } = await target.actor.rollAbilitySave("wis");
                        if (total < args[2]) {
                            ChatMessage.create({ content: target.name + " failed the save with a " + total });
                            ConditionControl.execute("apply", "Poisoned", target);
                        }
 else {
                            ChatMessage.create({ content: target.name + " passed the save with a " + total });
                        }
                    }
                }
            },
        }
    }).render(true);
}

if (args[0] === "on") {
    const hookId = Hooks.on("updateCombat", (combat, update) => {
        if (!("round" in update || "turn" in update)) return;
        if (combat.combatant.tokenId === args[1]) {
            EyebiteDialog();
        }
    });
    target.actor.setFlag("world", "EyebiteSpell", hookId);
    ChatMessage.create({ content: target.name + " is blessed with Eyebite" });
    EyebiteDialog();

}

//Cleanup hooks and flags.
if (args[0] === "off") {
    async function off() {
        ChatMessage.create({ content: "Eyebite is removed" });
        let hookIdFlag = await target.actor.getFlag("world", "EyebiteSpell");
        Hooks.off("updateCombat", hookIdFlag);
    }
    off();
    target.actor.unsetFlag("world", "EyebiteSpell");
}