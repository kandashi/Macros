let target = canvas.tokens.get(args[1]);
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");
let ActorGetFlag = game.macros.getName("ActorSetFlag");

// get the hookId here
const hookIdFlag = ActorGetFlag.execute(args[1], "world", "EyebiteSpell");
console.log(hookIdFlag)

if (args[0] === "on") {
    const hookId = Hooks.on("updateCombat", (combat, update) => {
        if (!("round" in update || "turn" in update)) return;
        if (combat.combatant.tokenId === args[1]) {
            new Dialog({
                title: "Eyebite options",
                content: "<p>Target a token and select the effect</p>",
                buttons: {
                    one: {
                        label: "Asleep",
                        callback: () => {
                            for (let target of game.user.targets) {
                                let save_roll = new Roll(`1d20 + ${target.actor.data.data.abilities.wis.save}`).roll();

                                save_roll.toMessage({
                                    speaker: ChatMessage.getSpeaker({ token: target }),
                                    rollMode: "blindroll"
                                });
                                if (save_roll.total < args[2]) {
                                    ChatMessage.create({ content: target.name + "failed the save with a " + save_roll.total })
                                    game.cub.applyCondition("Unconscious", target)
                                } else ChatMessage.create({ content: target.name + "passed the save with a " + save_roll.total })
                            }
                        }
                    },
                    two: {
                        label: "Panicked",
                        callback: () => {
                            for (let target of game.user.targets) {
                                let save_roll = new Roll(`1d20 + ${target.actor.data.data.abilities.wis.save}`).roll();

                                save_roll.toMessage({
                                    speaker: ChatMessage.getSpeaker({ token: target }),
                                    rollMode: "blindroll"
                                });
                                if (save_roll.total < args[2]) {
                                    ChatMessage.create({ content: target.name + "failed the save with a " + save_roll.total })
                                    game.cub.applyCondition("Unconscious", target)
                                } else ChatMessage.create({ content: target.name + "passed the save with a " + save_roll.total })

                            }
                        }
                    },
                    three: {
                        label: "Sickened",
                        callback: () => {
                            for (let target of game.user.targets) {
                                let save_roll = new Roll(`1d20 + ${target.actor.data.data.abilities.wis.save}`).roll();

                                save_roll.toMessage({
                                    speaker: ChatMessage.getSpeaker({ token: target }),
                                    rollMode: "blindroll"
                                });
                                if (save_roll.total < args[2]) {
                                    ChatMessage.create({ content: target.name + "failed the save with a " + save_roll.total })
                                    game.cub.applyCondition("Poisoned", target)
                                } else ChatMessage.create({ content: target.name + "passed the save with a " + save_roll.total })
                            }
                        }
                    },
                }
            }).render(true);

        }
    });
    ActorSetFlag.execute(args[1], "world", "EyebiteSpell", hookId);
    ChatMessage.create({ content: target.name + " is blessed with Eyebite" });
    new Dialog({
        title: "Eyebite options",
        content: "<p>Target a token and select the effect</p>",
        buttons: {
            one: {
                label: "Asleep",
                callback: () => {
                    for (let target of game.user.targets) {
                        let save_roll = new Roll(`1d20 + ${target.actor.data.data.abilities.wis.save}`).roll();

                        save_roll.toMessage({
                            speaker: ChatMessage.getSpeaker({ token: target }),
                            rollMode: "blindroll"
                        });
                        if (save_roll.total < args[2]) {
                            ChatMessage.create({ content: target.name + "failed the save with a " + save_roll.total })
                            game.cub.applyCondition("Unconscious", target)
                        } else ChatMessage.create({ content: target.name + "passed the save with a " + save_roll.total })
                    }
                }
            },
            two: {
                label: "Panicked",
                callback: () => {
                    for (let target of game.user.targets) {
                        let save_roll = new Roll(`1d20 + ${target.actor.data.data.abilities.wis.save}`).roll();

                        save_roll.toMessage({
                            speaker: ChatMessage.getSpeaker({ token: target }),
                            rollMode: "blindroll"
                        });
                        if (save_roll.total < args[2]) {
                            ChatMessage.create({ content: target.name + "failed the save with a " + save_roll.total })
                            game.cub.applyCondition("Unconscious", target)
                        } else ChatMessage.create({ content: target.name + "passed the save with a " + save_roll.total })

                    }
                },
            },
            three: {
                label: "Sickened",
                callback: () => {
                    for (let target of game.user.targets) {
                        let save_roll = new Roll(`1d20 + ${target.actor.data.data.abilities.wis.save}`).roll();

                        save_roll.toMessage({
                            speaker: ChatMessage.getSpeaker({ token: target }),
                            rollMode: "blindroll"
                        });
                        if (save_roll.total < args[2]) {
                            ChatMessage.create({ content: target.name + "failed the save with a " + save_roll.total })
                            game.cub.applyCondition("Poisoned", target)
                        } else ChatMessage.create({ content: target.name + "passed the save with a " + save_roll.total })
                    }
                }
            },
        }
    }).render(true)

}
if (args[0] === "off") {
    ChatMessage.create({ content: "Eyebite is removed" });
    Hooks.off("updateCombat", hookIdFlag);
    ActorUnSetFlag.execute(args[1], "world", "EyebiteSpell");
}