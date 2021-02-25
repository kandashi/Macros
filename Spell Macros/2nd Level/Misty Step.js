//DAE Macro Execute, Effect Value = "Macro Name" @target 
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const target = canvas.tokens.get(lastArg.tokenId) || token;


if (args[0] === "on") {
    let range = MeasuredTemplate.create({
        t: "circle",
        user: game.user._id,
        x: target.x + canvas.grid.size / 2,
        y: target.y + canvas.grid.size / 2,
        direction: 0,
        distance: 30,
        borderColor: "#FF0000",
        flags: {
            DAESRD: {
                MistyStep: {
                    ActorId: tactor.id
                }
            }
        }
        //fillColor: "#FF3366",
    });

    range.then(result => {
        let templateData = {
            t: "rect",
            user: game.user._id,
            distance: 7.5,
            direction: 45,
            x: 0,
            y: 0,
            fillColor: game.user.color,
            flags: {
                DAESRD: {
                    MistyStep: {
                        ActorId: tactor.id
                    }
                }
            }
        };



        Hooks.once("createMeasuredTemplate", deleteTemplatesAndMove);

        let template = new game.dnd5e.canvas.AbilityTemplate(templateData);
        template.actorSheet = tactor.sheet;
        template.drawPreview();

        async function deleteTemplatesAndMove(scene, template) {

            let removeTemplates = canvas.templates.placeables.filter(i => i.data.flags.DAESRD?.MistyStep?.ActorId === tactor.id);
            await target.update({ x: template.x, y: template.y })
            await canvas.templates.deleteMany([removeTemplates[0].id, removeTemplates[1].id]);
            await tactor.deleteEmbeddedEntity("ActiveEffect", lastArg.effectId); 
        };
    });
    
}


