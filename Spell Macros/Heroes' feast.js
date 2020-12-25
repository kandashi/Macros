//DAE Macro Execute, Effect Value = "Macro Name" @target 


let target = canvas.tokens.get(args[1]);
let amount = new Roll("2d10").roll().total;
/**
 * Update HP and Max HP to roll formula, save result as flag
 */
if (args[0] === "on") {
        let hpMax = target.actor.data.data.attributes.hp.max;
        let hp = target.actor.data.data.attributes.hp.value;
        await target.actor.update({"data.attributes.hp.max": (hpMax + amount), "data.attributes.hp.value": (hp + amount) });
        ChatMessage.create({content: `${target.name} gains ${amount} Max HP`});
        await target.actor.setFlag('world', 'HeroesFeast', amount);
};

// Remove Max Hp and reduce HP to max if needed
if (args[0] === "off") {
        let amountOff = await target.actor.getFlag('world', 'HeroesFeast');
        let hpMax = target.actor.data.data.attributes.hp.max;
        let newHpMax = hpMax - amountOff;
        await target.actor.update({"data.attributes.hp.max": newHpMax });
        if ( hpCurrent > newHpMax ) {
            await target.actor.update({"data.attributes.hp.value": newHpMax });
        }
        ChatMessage.create({content: target.name + "'s Max HP returns to normal"});
        target.actor.unsetFlag('world', 'HeroesFeast');
}