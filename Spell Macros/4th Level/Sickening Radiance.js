
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const target = canvas.tokens.get(lastArg.tokenId)
const DAEItem = lastArg.efData.flags.dae.itemData

const spellSave = args[1]

if(args[0] === "on"){
    let templateData = {
        t: "circle",
        user: game.user._id,
        distance: 30,
        direction: 0,
        x: 0,
        y: 0,
        fillColor: game.user.color,
        flags: {
            Kandashi: {
                SickeningRadiance: {
                    ActorId: tactor.id
                }
            }
        }
    };

    Hooks.once("createMeasuredTemplate", (_scene, template) => RunHooks(template));

    let template = new game.dnd5e.canvas.AbilityTemplate(templateData);
    template.actorSheet = tactor.sheet;
    template.drawPreview();

}

if(args[0] === "off"){
    let template = canvas.templates.placeables.find(i => i.data.flags?.Kandashi?.SickeningRadiance?.ActorId === tactor.id)
    if(template) template.delete()
    RemoveHooks()
    for (let token of canvas.tokens.placeables) {
        let effect = token.actor.effects.find(i => i.data.label === "Sickening Radiance");
        if(effect !== null) effect.delete();
        token.actor.unsetFlag("world", "SickeningRadianceSave");
    }
}

if(args[0] === "each"){
    let template = canvas.templates.placeables.find(i => i.data.flags?.Kandashi?.SickeningRadiance?.ActorId === tactor.id)
    RemoveHooks()
    RunHooks(template.data)
}

async function RemoveHooks(){
    let flag = await DAE.getFlag(tactor, "SickeningRadianceCast" )
    Hooks.off("updateToken", flag.movementHook)
    Hooks.off("updateCombat", flag.combatHook)
}

async function RunHooks(template){
    const movementId = Hooks.on("updateToken", (scene, token, update, flags, id) => {
        let movement = getProperty(update, "x") || getProperty(update, "y");
        if (movement === undefined) return;
        console.log("Update token");
        let testToken = canvas.tokens.get(token._id)
        CheckDistance(template, testToken)
    });
    
    const combatId = Hooks.on("updateCombat", (combat, changed, options, userId) => {
        if (!("turn" in changed)) return;
        async function combatCheck() {
            let testToken2 = canvas.tokens.get(combat.combatant.tokenId);
            await testToken2.unsetFlag('world', 'SickeningRadianceSave');
            CheckDistance(template, testToken2)
        } combatCheck();
    });
    DAE.setFlag(tactor, "SickeningRadianceCast", {
        movementHook : movementId,
        combatHook : combatId 
    })
}



function CheckDistance(template, token){
    debugger
    let templateSphere = [template.x, template.y, template.distance];
    let tokenCenter = token.center;
    templateSphere[2] = (templateSphere[2] * canvas.grid.size) / canvas.scene.data.gridDistance;
    let distance = Math.pow((templateSphere[0] - tokenCenter.x), 2) + Math.pow((templateSphere[1] - tokenCenter.y), 2);
    if (Math.pow((templateSphere[2]), 2) >= distance) {
        StinkingCloud(token);
    }
}


async function StinkingCloud(token) {

    if (token.getFlag('world', 'SickeningRadianceSave')) return;
    const flavor = `${CONFIG.DND5E.abilities["con"]} DC${spellSave} ${DAEItem?.name || ""}`;
    let saveRoll = (await tactor.rollAbilitySave("con", { flavor })).total;

    if (saveRoll < spellSave) {
        let roll = new Roll("4d10").roll().total;
        let targets = new Set();
        let saves = new Set();
        let effect = token.actor.effects.find(i => i.data.label === "Sickening Radiance");
        let newExhaustion;
        if (effect !== null) {
            newExhaustion = effect.data.changes[0].value + 1;
        }
 else newExhaustion = 1;
        targets.add(token);
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
    token.setFlag('world', 'SickeningRadianceSave', true);
}
