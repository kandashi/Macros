let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");
let ActorGetFlag = game.macros.getName("ActorGetFlag");

if (args[0] === "on") {
    const hookId = Hooks.on("updateCombat", (combat, changed, options, userId) => {
        if (!("turn" in changed)) return;

        if (combat.combatant.tokenId === args[1]) {
            Confusion(combat.combatant.name);
        }
    });
    ActorSetFlag.execute(args[1], "world", "ConfusionSpell", hookId);


} else if (args[0] === "off") {
    async function off() {
        let hookIdFlag = await ActorGetFlag.execute(args[1], "world", "ConfusionSpell");
        console.log("testing......." + hookIdFlag)
        Hooks.off("updateCombat", hookIdFlag);
    }
    off()
    ActorUnSetFlag.execute(args[1], "world", "ConfusionSpell");
}

function Confusion(name) {
    let confusionRoll = new Roll("1d10").roll().total
    let content;
    switch (confusionRoll) {
        case 1: content = "The creature uses all its movement to move in a random direction. To determine the direction, roll a  [[d8]] and assign a direction to each die face. The creature doesn't take an action this turn."
        case 2: content = "	The creature doesn't move or take actions this turn."
        case 3:
        case 4:
        case 5:
        case 6:
        case 7: content = "The creature uses its action to make a melee attack against a randomly determined creature within its reach. If there is no creature within its reach, the creature does nothing this turn."
        case 8:
        case 9: content = "The creature can act and move normally."
        case 10:
    }
    ChatMessage.create({ content: `Confusion roll for ${name} is ${confusionRoll}: ` + content })
}