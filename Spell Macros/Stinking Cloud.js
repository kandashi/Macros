//for template

const templateID = canvas.templates.placeables[canvas.templates.placeables.length - 1].data._id;
const caster = game.actors.get(args[0].actor._id);
const spellSave = caster.data.data.attributes.spelldc;

const combatId = Hooks.on("updateCombat", (combat, changed, options, userId) => {
    if (!("turn" in changed)) return;
    console.log("Update combat");
    async function combatCheck() {
        let template = canvas.templates.get(templateID);
        let testToken2 = canvas.tokens.get(combat.combatant.tokenId);
        await testToken2.unsetFlag('world', 'StinkingCloudSave');
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
        let flag = await caster.getFlag("world", "StinkingCloud");
        Hooks.off("updateToken", flag.tokenHook);
        Hooks.off("updateCombat", flag.combatHook);
        Hooks.off("deleteMeasuredTemplate", flag.deleteHook);
        caster.unsetFlag("world", "StinkingCloud");
        //search for all Stinking Cloud effects and remove
    }
    deleteTemplate();
    for (let token of canvas.tokens.placeables) {
        let effect = token.actor.effects.find(i => i.data.label === "Stinking Cloud");
        if (effect !== null) effect.delete();
        token.actor.unsetFlag("world", "StinkingCloudSave");
    }
});



caster.setFlag('world', 'StinkingCloud', {
    tokenHook: tokenId,
    combatHook: combatId,
    deleteHook: deleteID
});



async function StinkingCloud(testToken) {
    let token = canvas.tokens.get(testToken.id);
    if (token.getFlag('world', 'StinkingCloudSave')) return;
    let save = await token.actor.rollAbilitySave("con");
    if (save.total < spellSave) {
        ChatMessage.create({ content: `${token.name} spends its turn doing nothing` })
    }
}


/*
if(args[0] === "off"){
    async function RadianceOff() {
        let flag = await caster.actor.getFlag("world", "StinkingCloud");
        Hooks.off("updateToken", flag.tokenHook);
        Hooks.off("preUpdateCombat", flag.combatHook);
        caster.unsetFlag("world", "StinkingCloud");
    }
    RadianceOff()
    template.delete()

}

*/

