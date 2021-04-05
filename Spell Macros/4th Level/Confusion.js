//DAE Macro , Effect Value = @target @attributes.spelldc

const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);

const DAEItem = lastArg.efData.flags.dae.itemData
const saveData = DAEItem.data.save

if (args[0] === "each") {

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
        ChatMessage.create({ content: `Confusion roll for ${tactor.name} is ${confusionRoll}: ` + content });

        const flavor = `${CONFIG.DND5E.abilities[saveData.ability]} DC${saveData.dc} ${DAEItem?.name || ""}`;
        let saveRoll = (await tactor.rollAbilitySave(saveData.ability, { flavor })).total;

    if(saveRoll >= DC) {
        ChatMessage.create({ content: `Confusion ends for ${tactor.name} at the end of their turn`})
        tactor.deleteEmbeddedEntity("ActiveEffect", lastArg.effectId); 
    }

}