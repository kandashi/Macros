const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
let target = canvas.tokens.get(lastArg.tokenId)

const DAEItem = lastArg.efData.flags.dae.itemData
const saveData = DAEItem.data.save

if(args[0]=== "on"){

    new Dialog({
        title: "Choose the colour for Faerie Fire",
        buttons: {
            one: {
                label: "Blue",
                callback: () => {
                    DAE.setFlag(tactor, 'FaerieFire', {
                        color: target.data.lightColor,
                        alpha: target.data.lightAlpha,
                        dimLight: target.data.dimLight
                    });
                    target.update({"lightColor": "#5ab9e2", "lightAlpha" : 0.16, "dimLight" : "10"})
                }
            },
            two: {
                label: "Green",
                callback: () => {
                    DAE.setFlag(tactor, 'FaerieFire', {
                        color: target.data.lightColor,
                        alpha: target.data.lightAlpha,
                        dimLight: target.data.dimLight
                    });
                    target.update({"lightColor": "#55d553", "lightAlpha" : 0.16,"dimLight" : "10"})
                }
            },
            three: {
                label: "Other",
                callback: () => {
                    DAE.setFlag(tactor, 'FaerieFire', {
                        color: target.data.lightColor,
                        alpha: target.data.lightAlpha,
                        dimLight: target.data.dimLight
                    });
                    target.update({"lightColor": "#844ec6", "lightAlpha" : 0.16,"dimLight" : "10"})
                }
            }
        }
    }).render(true);
}

if(args[0] === "off"){
    let {color, alpha, dim} = await DAE.getFlag(tactor, "FaerieFire")
    target.update({"lightColor": color, "lightAlpha": alpha,"dimLight" : dim})
    DAE.unsetFlag(tactor, "FaerieFire")
}