//for template


const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const target = canvas.tokens.get(lastArg.tokenId) || token;
const DAEItem = lastArg.efData.flags.dae.itemData

const save = args[1]

if (args[0] === "on") {
    let templateData = {
        t: "circle",
        user: game.user._id,
        distance: 20,
        direction: 0,
        x: 0,
        y: 0,
        fillColor: game.user.color,
        flags: {
            DAESRD: {
                StinkingCloud: {
                    ActorId: tactor.id
                }
            }
        }
    };
    Hooks.once("createMeasuredTemplate", (scene, template) => setHooks(template));

    let template = new game.dnd5e.canvas.AbilityTemplate(templateData);
    template.actorSheet = tactor.sheet;
    template.drawPreview();

}
if (args[0] === "off") {
    async function RadianceOff() {
        let flag = await DAE.getFlag(tactor, "StinkingCloudCast");
        Hooks.off("updateCombat", flag.combatId);
        DAE.unsetFlag(tactor, "StinkingCloudCast");
        let template = canvas.templates.get(flag.template._id)
        if(template) template.delete()
    }
    RadianceOff()
    for (let token of canvas.tokens.placeables) {
        DAE.unsetFlag(token, "StinkingCloudSave")
    }

}

function setHooks(template) {
    const combatId = Hooks.on("updateCombat", async (combat, changed, options, userId) => {
        if (!("turn" in changed)) return;
        let testToken2 = canvas.tokens.get(combat.combatant.tokenId);
        await DAE.unsetFlag(testToken2, 'StinkingCloudSave');
        let templateSphere = [template.x, template.y, template.distance];
        let tokenCenter = testToken2.center;
        templateSphere[2] = (templateSphere[2] * canvas.grid.size) / canvas.scene.data.gridDistance;
        let distance = Math.pow((templateSphere[0] - tokenCenter.x), 2) + Math.pow((templateSphere[1] - tokenCenter.y), 2);
        let c2 = Math.pow((templateSphere[2]), 2);
        if (c2 >= distance) {
            StinkingCloud(testToken2);
        }
    });
    DAE.setFlag(tactor, "StinkingCloudCast", {
        combatId: combatId,
        template: template
    })
};


async function StinkingCloud(token) {
    if (token.getFlag('world', 'StinkingCloudSave')) return;
    if (token.actor.data.data.traits.di.value.includes("poison")) return
    const flavor = `${CONFIG.DND5E.abilities["con"]} DC${save} ${DAEItem?.name || ""}`;
    let saveRoll = (await tactor.rollAbilitySave("con", { flavor })).total;

    if (saveRoll < save) {
        ChatMessage.create({ content: `${token.name} spends its turn doing nothing` })
    } else {
        ChatMessage.create({content: `${token.name} saves againts Stinking Cloud`})
    }
}



