//DAE Item Macro Execute, Effect Value = @attributes.spelldc

const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);

const DAEItem = lastArg.efData.flags.dae.itemData
const saveData = DAEItem.data.save
const DC = args[1]
/**
 * Create Moonbeam item in inventory
 */
if (args[0] === "on") {
  let templateData = {
    t: "circle",
    user: game.user._id,
    distance: 5,
    direction: 0,
    x: 0,
    y: 0,
    flags: {
        DAESRD: {
            Moonbeam: {
                ActorId: tactor.id
            }
        }
    },
    fillColor: game.user.color
}
let template = new game.dnd5e.canvas.AbilityTemplate(templateData)
template.actorSheet = tactor.sheet;
template.drawPreview()

  let damage = DAEItem.data.level;
  await tactor.createOwnedItem(
    {
      "name": "Moonbeam repeating",
      "type": "spell",
      "data": {
        "source": "Casting Moonbeam",
        "ability": "",
        "description": {
          "value": "half damage on save" 
        },
        "actionType": "save",
        "attackBonus": 0,
        "damage": {
          "parts": [
            [
              `${damage}d10`,
              "radiant"
            ]
          ],
        },
        "formula": "",
        "save": {
          "ability": "con",
          "dc": saveData.dc,
          "scaling": "spell"
        },
        "level": 0,
        "school": "abj",
        "preparation": {
          "mode": "prepared",
          "prepared": false
        },

      },
      "img": DAEItem.img,
    }
  );
}

// Delete Moonbeam
if (args[0] === "off") {
  let casterItem = tactor.data.items.find(i => i.name === "Moonbeam repeating" && i.type === "spell")
  tactor.deleteOwnedItem(casterItem._id)
  let template = canvas.templates.placeables.filter(i => i.data.flags.DAESRD?.Moonbeam?.ActorId === tactor.id)
    canvas.templates.deleteMany(template[0].id)
}
