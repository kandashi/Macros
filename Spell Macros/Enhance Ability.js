const targetArray = [args[1]]
if (args[0] === "on") {
    targetArray.forEach((element) => {
        let target = canvas.tokens.get(args[1]);
        if (target && !target.getFlag('world', 'enhanceAbilityBear') && !target.getFlag('world', 'enhanceAbilityBull') && !target.getFlag('world', 'enchanceAbilityOther')) {
            new Dialog({
                title: "Choose enhance ability effect",
                buttons: {
                    one: {
                        label: "Bear's Endurance",
                        callback: () => {                            
                                let formula = `2d6`;
                                let amount = new Roll(formula).roll().total;
                                token.setFlag('world', 'enhanceAbilityBear', 1)
                                target.actor.update({ "data.attributes.hp.temp": amount });
                            
                        }
                    },
                    two: {
                        label: "Bull's Strength",
                        callback: () => {
                            let encumberanceMax = data.attributes.encumbrance.max;
                            let newEncumberance = (encumberanceMax * 2);
                            target.actor.update({ "data.attributes.encumbrance.max": newEncumberance })
                            token.setFlag('world', 'enhanceAbilityBull', encumberanceMax)
                        }
                    },
                    three: {
                        label: "Other",
                        callback: () => {
                            token.setFlag('world', 'enchanceAbilityOther', 1)
                        }
                    }
                }
            }).render(true);
        }
    })
} else {
    targetArray.forEach((element) => {
        let target = canvas.tokens.get(args[1]);
        if (target && target.getFlag('world', 'enhanceAbilityBear') && target.getFlag('world', 'enhanceAbilityBull') &&  target.getFlag('world', 'enchanceAbilityOther')) {
            if(target.getFlag('world', 'enhanceAbilityBull')){
                target.actor.update({ "data.attributes.encumbrance.max": encumberanceMax })
            }
            token.unsetFlag('world', 'enhanceAbilityBull');
            token.unsetFlag('world', 'enhanceAbilityBear');
            token.unsetFlag('world', 'enchanceAbilityOther');
        }
    })
}