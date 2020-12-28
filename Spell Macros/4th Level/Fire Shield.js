let target = canvas.tokens.get(args[1]);

if (args[0] === "on") {
    if (token) {   
        new Dialog({
            title: "Warm or Cold Shield",
            buttons: {
                one: {
                    label: "Warm",
                    callback: () => {
                        let resistances = target.actor.data.data.traits.dr.value;
                        resistances.push("cold");
                        target.actor.update({ "data.traits.dr.value": resistances });
                        target.actor.setFlag('world', 'FireShield', "cold");
                        ChatMessage.create({ content: target.name + " gains resistnace to cold" });
                    }
                },
                two: {
                    label: "Cold",
                    callback: () => {
                        let resistances = target.actor.data.data.traits.dr.value;
                        resistances.push("fire");
                        target.actor.update({ "data.traits.dr.value": resistances });
                        target.actor.setFlag('world', 'FireShield', "fire");
                        ChatMessage.create({ content: target.name + " gains resistnace to fire" });
                    }
                },
            }
        }).render(true);

    }
}
if (args[0] === "off") {
    let element = target.actor.getFlag('world', 'FireShield');
    let resistances = target.actor.data.data.traits.dr.value;
    const index = resistances.indexOf(element);
    resistances.splice(index, 1);
    target.actor.update({ "data.traits.dr.value": resistances });
    ChatMessage.create({ content: "Fire Shield expires on " + target.name});

}
