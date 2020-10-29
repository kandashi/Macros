const targetArray = [args[1]]
let ActorUpdate = game.macros.getName("ActorUpdate");
let ActorSetFlag = game.macros.getName("ActorSetFlag");
let ActorUnSetFlag = game.macros.getName("ActorUnSetFlag");
let ActorGetFlag = game.macros.getName("ActorGetFlag");
let formula = "2d10";
let amount = new Roll(formula).roll().total;

if (args[0] === "on") {
    targetArray.forEach( async (element) => {
        let target = canvas.tokens.get(args[1]);
        let hpMax = target.actor.data.data.attributes.hp.max
        let hp = target.actor.data.data.attributes.hp.value
        await ActorUpdate.execute(args[1], { "data.attributes.hp.max": (hpMax + amount), "data.attributes.hp.value": (hp + amount) });
        ChatMessage.create({content: target.name + " gains " + amount + " Max HP"})
        await ActorSetFlag.execute(args[1], 'world', 'HeroesFeast', amount)
    })
};
if (args[0] === "off") {
    targetArray.forEach((element) => {
        let target = canvas.tokens.get(args[1]);
        let amountOff = await ActorGetFlag.execute(args[1], 'world', 'HeroesFeast')
        let hpMax = target.actor.data.data.attributes.hp.max;
        let hpCurrent = target.actor.data.data.attributes.hp.value;
        let newHpMax = target.actor.data.data.attributes.hp.max - amountOff;
        await ActorUpdate.execute(args[1], { "data.attributes.hp.max": newHpMax });
        if ( hpCurrent > newHpMax ) {
            await ActorUpdate.execute(args[1], { "data.attributes.hp.value": newHpMax });
        }
        ChatMessage.create({content: target.name + "'s Max HP returns to normal"});
        ActorUnSetFlag.execute(args[1], 'world', 'HeroesFeast')
    })
}