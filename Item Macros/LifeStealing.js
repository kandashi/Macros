let target = canvas.tokens.get(args[1]);
let ActorUpdate = game.macros.getName("ActorUpdate");
let casterId = token.data.actorId
console.log(casterId)
console.log(args[2])
if (args[0] === "on") {
    let formula = args[2];
    let amount = new Roll(formula).roll().total;
    let targetNewHp = target.actor.data.data.attributes.hp.value - amount
    let tokenNewHp = token.actor.data.data.attributes.hp.value + amount
    ActorUpdate.execute(args[1],{"data.attributes.hp.value": targetNewHp});
    ActorUpdate.execute(casterId,{"data.attributes.hp.value": targetNewHp});
    ChatMessage.create({content: target.name + "looses "+ amount + " health and " + token.name + " gains "+ amount + " health"});
}