const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const target = canvas.tokens.get(lastArg.tokenId)


if (args[0] === "on") {  
        new Dialog({
            title: "Warm or Cold Shield",
            buttons: {
                one: {
                    label: "Warm",
                    callback: () => {
                        let resistances = tactor.data.data.traits.dr.value;
                        resistances.push("cold");
                        tactor.update({ "data.traits.dr.value": resistances });
                        DAE.setFlag(tactor, 'FireShield', "cold");
                        ChatMessage.create({ content: `${target.name} gains resistnace to cold` });
                    }
                },
                two: {
                    label: "Cold",
                    callback: () => {
                        let resistances = tactor.data.data.traits.dr.value;
                        resistances.push("fire");
                        tactor.update({ "data.traits.dr.value": resistances });
                        DAE.setFlag(tactor, 'FireShield', "fire");
                        ChatMessage.create({ content: `${target.name} gains resistnace to fire` });
                    }
                },
            }
        }).render(true);
}
if (args[0] === "off") {
    let element = DAE.getFlag(tactor, 'FireShield');
    let resistances = tactor.data.data.traits.dr.value;
    const index = resistances.indexOf(element);
    resistances.splice(index, 1);
    tactor.update({ "data.traits.dr.value": resistances });
    ChatMessage.create({ content: "Fire Shield expires on " + target.name});
    DAE.unsetFlag(tactor, 'FireShield');

}