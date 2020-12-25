//DAE Macro Execute, Effect Value = "Macro Name" @target 

if (args[0] === "on") {
    const hookId = Hooks.on("updateCombat", (combat, changed, options, userId) => {
        if (!("turn" in changed)) return;

        if (combat.combatant.tokenId === args[1]) {
            Confusion(combat.combatant.name);
        }
    });
    target.setFlag("world", "ConfusionSpell", hookId);


} 
else if (args[0] === "off") {
    async function off() {
        let hookIdFlag = await target.getFlag("world", "ConfusionSpell");
        Hooks.off("updateCombat", hookIdFlag);
        target.unsetFlag("world", "ConfusionSpell");

    }
    off();
}

function Confusion(name) {
    let confusionRoll = new Roll("1d10").roll().total;
    let content;
    switch (confusionRoll) {
        case 1:
            content = "The creature uses all its movement to move in a random direction. To determine the direction, roll a  [[d8]] and assign a direction to each die face. The creature doesn't take an action this turn.";
            break;
        case 2:
            content = "	The creature doesn't move or take actions this turn.";
            break;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            content = "The creature uses its action to make a melee attack against a randomly determined creature within its reach. If there is no creature within its reach, the creature does nothing this turn.";
            break;
        case 8:
        case 9:
        case 10:
            content = "The creature can act and move normally.";
            break;
    }
    ChatMessage.create({ content: `Confusion roll for ${name} is ${confusionRoll}: ` + content });
}