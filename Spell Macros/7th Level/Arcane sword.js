//DAE Macro Execute, Effect Value = "Macro Name" @target
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);

let casterToken = canvas.tokens.get(lastArg.tokenId) || token;
const DAEitem = lastArg.efData.flags.dae.itemData
const saveData = DAEitem.data.save
/**
 * Create Arcane Sword item in inventory
 */
if (args[0] === "on") {
    let image = DAEitem.img;
    let range = MeasuredTemplate.create({
        t: "circle",
        user: game.user._id,
        x: casterToken.x + canvas.grid.size / 2,
        y: casterToken.y + canvas.grid.size / 2,
        direction: 0,
        distance: 60,
        borderColor: "#FF0000",
        flags: {
            DAESRD: {
                ArcaneSwordRange: {
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
            distance: 7,
            direction: 45,
            x: 0,
            y: 0,
            flags: {
                DAESRD: {
                    ArcaneSword: {
                        ActorId: tactor.id
                    }
                }
            },
            fillColor: game.user.color
        }
        Hooks.once("createMeasuredTemplate", deleteTemplates);

        let template = new game.dnd5e.canvas.AbilityTemplate(templateData)
        template.actorSheet = tactor.sheet;
        template.drawPreview()

        async function deleteTemplates(scene, template) {
            let removeTemplates = canvas.templates.placeables.filter(i => i.data.flags.DAESRD?.ArcaneSwordRange?.ActorId === tactor.id);
            await canvas.templates.deleteMany([removeTemplates[0].id]);
        };

    })
    await tactor.createOwnedItem(
        {
            "name": "Summoned Arcane Sword",
            "type": "weapon",
            "data": {
                "quantity": 1,
                "activation": {
                    "type": "action",
                    "cost": 1,
                    "condition": ""
                },
                "target": {
                    "value": 1,
                    "type": "creature"
                },
                "range": {
                    "value": 5,
                    "long": null,
                    "units": ""
                },
                "ability": DAEitem.data.ability,
                "actionType": "msak",
                "attackBonus": "0",
                "chatFlavor": "",
                "critical": null,
                "damage": {
                    "parts": [
                        [
                            `3d10`,
                            "force"
                        ]
                    ],
                    "versatile": ""
                },
                "weaponType": "simpleM",
                "proficient": true,
            },
            "flags": {
                "DAESRD": {
                  "ArcaneSword":
                    tactor.id
                }
              },
            "img": image,
        }
    );
    ui.notifications.notify("Weapon created in your inventory")
}

// Delete Flame Blade
if (args[0] === "off") {
    let sword = tactor.items.find(i => i.data.flags?.DAESRD?.ArcaneSword === tactor.id)
  let template = canvas.templates.placeables.filter(i => i.data.flags.DAESRD.ArcaneSword?.ActorId === tactor.id)
  if(sword) await tactor.deleteOwnedItem(sword.id);
  if(template) await canvas.templates.deleteMany(template[0].id)
}
