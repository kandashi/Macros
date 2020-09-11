let target = canvas.tokens.get(args[1])
if (!target) {
    ChatMessage.create({ content: "No target found" })
    return;
}
if (args[0] === "on") {
    var params = [{

    }];
}
else {
    var params = [{
        filterType: "type",
        filterId: "id",
        enabled: false
    }];
}
TokenMagic.addUpdateFilters(target, params);

if (token) {
    let increment = (args[2] - 1) * 5;
    let formula = `1d4 + 1` + increment;
    console.log(formula);
    let amount = new Roll(formula).roll().total;
    console.log(amount)
    //Note: Just change the number after the comma to heal/receive other HP values. Negative numbers indicate damage.
    token.actor.update({ "data.attributes.hp.temp": amount })
} else {
    ui.notifications.notify("Please select a token.");
}

if (token) {
    if (token.data.lightColor = e6a449) {
        token.update({ dimLight: 0, brightLight: 0, lightColor: 0 })
    } else {
        let dim = 20;
        let bright = 10;
        let colour = `e6a449`;
        token.update({ dimLight: dim, brightLight: bright, lightColor: colour })
    }
}

var params = [{
    filterType: "field",
filterId: "Bane",
shieldType: 10,
gridPadding: 1,
color: 0x902005,
time: 0,
blend: 5,
intensity: 0.5,
lightAlpha: 4,
lightSize: 0.8,
scale: 0.5,
radius: 1,
chromatic: false,
animated :
{
time : 
{ 
active: true, 
speed: 0.0015, 
animType: "move" 
}
}
}];
TokenMagic.addUpdateFilters(target, params);