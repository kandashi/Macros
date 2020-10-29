const targetArray = [args[1]]
let ActorUpdate = game.macros.getName("ActorUpdate");
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");
let ActorGetFlag = game.macros.getName("ActorGetFlag");


if (args[0] === "on") {
    targetArray.forEach((element) => {
        let target = canvas.tokens.get(args[1]);
        if (target && !target.getFlag('world', 'enhanceAbility')) {
            new Dialog({
                title: "Choose enhance ability effect for " + target.name,
                buttons: {
                    one: {
                        label: "Bear's Endurance",
                        callback: () => {
                            let formula = `2d6`;
                            let amount = new Roll(formula).roll().total;
                            ActorSetFlag.execute(args[1], 'world', 'enhanceAbility', {
                                name: "bear",
                            });
                            ChatMessage.create({ content: target.name + " gains " + amount + " temp Hp" })
                            ActorUpdate.execute(args[1], { "data.attributes.hp.temp": amount });

                        }
                    },
                    two: {
                        label: "Bull's Strength",
                        callback: () => {
                            ChatMessage.create({ content: target.name + "s encumberance is doubled" })
                            ActorSetFlag.execute(args[1], 'world', 'enhanceAbility', {
                                name: "bull"
                            });
                            ActorSetFlag.execute(args[1], 'dnd5e', 'powerfulBuild', true)
                        }
                    },
                    three: {
                        label: "Other",
                        callback: () => {
                            ActorSetFlag.execute(args[1], 'world', 'enhanceAbility', {
                                name: "other",
                            });
                            ChatMessage.create({ content: "A non automated Ability was enhanced for " + target.name })
                        }
                    }
                }
            }).render(true);
        }
    })
}
if (args[0] === "off") {
    targetArray.forEach((element) => {
        let target = canvas.tokens.get(args[1]);
        let flag = target.actor.getFlag('world', 'enhanceAbility');
        if (flag.name === "bull") ActorUnSetFlag.execute(args[1], 'dnd5e', 'powerfulBuild', false)
        ActorUnSetFlag.execute(args[1], 'world', 'enhanceAbility')
        ChatMessage.create({ content: "Enhance Ability has expired" })
    }
    )
}