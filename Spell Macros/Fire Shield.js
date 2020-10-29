let target = canvas.tokens.get(args[1]);
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");
let ActorGetFlag = game.macros.getName("ActorGetFlag");

if (args[0] === "on") {
    if (token) {   
        new Dialog({
            title: "Warm or Cold Shield",
            buttons: {
                one: {
                    label: "Warm",
                    callback: () => {
                        let resistances = target.actor.data.data.traits.dr.value
                        resistances.push("cold")
                        ActorSetFlag.execute(args[1], 'world', 'FireShield', "cold")
                        ChatMessage.create({ content: target.name + " gains resistnace to cold" })
                    }
                },
                two: {
                    label: "Cold",
                    callback: () => {
                        let resistances = target.actor.data.data.traits.dr.value
                        resistances.push("fire")
                        ActorSetFlag.execute(args[1], 'world', 'FireShield', "fire")
                        ChatMessage.create({ content: target.name + " gains resistnace to fire" })
                    }
                },
            }
        }).render(true);

    }
}
if (args[0] === "off") {
    let element = ActorGetFlag.execute(args[1], 'world', 'FireShield')
    let resistances = target.actor.data.data.traits.dr.value
    const index = resistances.indexOf(element)
    resistances.splice(index, 1)
    ChatMessage.create({ content: "Fire Shield expires on " + target.name})

}