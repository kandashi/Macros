//for template

const templateID = canvas.templates.placeables[canvas.templates.placeables.length - 1].data._id;
const caster = game.actors.get(args[0].actor._id);
const spellSave = caster.data.data.attributes.spelldc;

const tokenId = Hooks.on("updateToken", (scene, token, update, flags, id) => {
    let movement = getProperty(update, "x") || getProperty(update, "y");
    if (movement === undefined) return;
    console.log("Update token");
    let template = canvas.templates.get(templateID);
    let testToken1 = canvas.tokens.get(token._id);
    let templateSphere = [template.data.x, template.data.y, template.data.distance];
    let tokenCenter = testToken1.center;
    templateSphere[2] = (templateSphere[2] * canvas.grid.size) / canvas.scene.data.gridDistance;
    let distance = Math.pow((templateSphere[0] - tokenCenter.x), 2) + Math.pow((templateSphere[1] - tokenCenter.y), 2);
    if (Math.pow((templateSphere[2]), 2) >= distance) {
        StinkingCloud(testToken1);
    }
});

const combatId = Hooks.on("updateCombat", (combat, changed, options, userId) => {
    if (!("turn" in changed)) return;
    console.log("Update combat");
    debugger;
    async function combatCheck() {
        let template = canvas.templates.get(templateID);
        let testToken2 = canvas.tokens.get(combat.combatant.tokenId);
        await testToken2.unsetFlag('world', 'SickeningRadianceSave');
        let templateSphere = [template.data.x, template.data.y, template.data.distance];
        let tokenCenter = testToken2.center;
        templateSphere[2] = (templateSphere[2] * canvas.grid.size) / canvas.scene.data.gridDistance;
        let distance = Math.pow((templateSphere[0] - tokenCenter.x), 2) + Math.pow((templateSphere[1] - tokenCenter.y), 2);
        let c2 = Math.pow((templateSphere[2]), 2);
        if (c2 >= distance) {
            StinkingCloud(testToken2);
        }
    } combatCheck();
});


const deleteID = Hooks.on("deleteMeasuredTemplate", (scene, data, options, id) => {
    if (data._id !== templateID) return;
    async function deleteTemplate() {
        let flag = await caster.getFlag("world", "SickeningRadiance");
        Hooks.off("updateToken", flag.tokenHook);
        Hooks.off("updateCombat", flag.combatHook);
        Hooks.off("deleteMeasuredTemplate", flag.deleteHook);
        caster.unsetFlag("world", "SickeningRadiance");
        //search for all sickening radiance effects and remove
    }
    deleteTemplate();
    for (let token of canvas.tokens.placeables) {
        let effect = token.actor.effects.find(i => i.data.label === "Sickening Radiance");
        if(effect !== null) effect.delete();
        token.actor.unsetFlag("world", "SickeningRadianceSave");
    }
});



caster.setFlag('world', 'SickeningRadiance', {
    tokenHook: tokenId,
    combatHook: combatId,
    deleteHook: deleteID
});



async function StinkingCloud(testToken) {
    let token = canvas.tokens.get(testToken.id);
    if (token.getFlag('world', 'SickeningRadianceSave')) return;
    let save = await token.actor.rollAbilitySave("con");
    debugger;
    if (save.total < spellSave) {
        let roll = new Roll("4d10").roll().total;
        let targets = new Set();
        let saves = new Set();
        let effect = token.actor.effects.find(i => i.data.label === "Sickening Radiance");
        let newExhaustion;
        if (effect !== null) {
            newExhaustion = effect.data.changes[0].value + 1;
        }
 else newExhaustion = 1;
        targets.add(testToken);
        saves.add(targets);
        MidiQOL.applyTokenDamage([{ damage: roll, type: "radiant" }], 10, targets, [], saves);

        let actorExhaustion = getProperty(token.actor, "_data.data.attributes.exhaustion");
        if (isNaN(actorExhaustion)) actorExhaustion = 0;
        actorExhaustion = Math.min(actorExhaustion, 6);
        let totalExhaustion = actorExhaustion + newExhaustion;
        let newIcon;
        switch (totalExhaustion) {
            case 1:
                newIcon = "modules/combat-utility-belt/icons/exhaustion1.svg";
                break;
            case 2:
                newIcon = "modules/combat-utility-belt/icons/exhaustion2.svg";
                break;
            case 3:
                newIcon = "modules/combat-utility-belt/icons/exhaustion3.svg";
                break;
            case 4:
                newIcon = "modules/combat-utility-belt/icons/exhaustion4.svg";
                break;
            case 5:
                newIcon = "modules/combat-utility-belt/icons/exhaustion5.svg";
                break;
            case 6:
                newIcon = "modules/combat-utility-belt/icons/dead.svg";
                break;
        }
        if (effect !== null) {
            let icon = effect.data.icon;
            icon = newIcon;
            let changes = effect.data.changes;
            changes[0].value = newExhaustion;
            effect.update({ changes, icon });
        }
 else {
            let effectData = {
                label: "Sickening Radiance",
                icon: newIcon,
                changes: [{
                    "key": "data.attributes.exhaustion",
                    "mode": 2,
                    "value": newExhaustion,
                    "priority": "20"
                }],
                duration: {
                    "seconds": 5000,
                }
            };
            token.actor.createEmbeddedEntity("ActiveEffect", effectData);
        }
    }
    debugger;
    token.setFlag('world', 'SickeningRadianceSave', true);
}



/*
if(args[0] === "off"){
    async function RadianceOff() {
        let flag = await caster.actor.getFlag("world", "SickeningRadiance");
        Hooks.off("updateToken", flag.tokenHook);
        Hooks.off("preUpdateCombat", flag.combatHook);
        caster.unsetFlag("world", "SickeningRadiance");
    }
    RadianceOff()
    template.delete()

}

*/

