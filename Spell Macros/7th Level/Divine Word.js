////DAE Macro Execute, Effect Value = "Macro Name" @target

/**
 * Apply Divine Word to targeted tokens
 * @param {Number} targetHp 
 * @param {Boolean} linked 
 */

let ActorUpdate = game.macros.getName("ActorUpdate");
let target = canvas.tokens.get(args[1]);

async function DivineWordApply(target, targetHp, linked) {

    if (targetHp <= 20) {
        if (linked = true) {
           await target.actor.update({"data.attributes.hp.value": 0});
        } else if (linked = false)  { 
            target.update({"actorData.data.attributes.hp.value": 0})
        }

    } else if (targetHp <= 30) {
        await game.cub.addCondition(["Blinded","Deafened","Stunned"], target)
        game.Gametime.doIn({ hours: 1 }, async () => {
            game.cub.removeCondition(["Blinded","Deafened","Stunned"], target)
        });
    } else if (targetHp <= 40) {
        await game.cub.addCondition(["Blinded","Deafened"], target)
        game.Gametime.doIn({ minutes: 10 }, async () => {
            game.cub.removeCondition(["Blinded","Deafened", target])
        });
    } else if (targetHp <= 50) {
        await game.cub.addCondition("Deafened", target)
        game.Gametime.doIn({ minutes: 1 }, async () => {
            game.cub.removeCondition("Deafened", target)
        });
    }
}
if (args[0] === "on") {
        let targetHp = null;
        let linked = null;
        if (target.data.actorLink == true) {
            targetHp = target.actor.data.data.attributes.hp.value
            linked = true
        } else {
            targetHp = getProperty(target, "actorData.data.attributes.hp") || getProperty(target.actor, "data.data.attributes.hp.value")
            linked = false
        }
        DivineWordApply(target, targetHp, linked)
}

if(args[0] === "off") return;
