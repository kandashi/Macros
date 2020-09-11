let target = canvas.tokens.get(args[1]);
let dimVision = target.dimSight

if (args[0] === "on") {
    target.setFlag('world', 'darkvisionSpell', dimVision)
    target.update({ "dimSight" : 60 })
} else {
    let sight = target.getFlag('world', 'darkvisionSpell');
    target.update({ "dimSight" : sight });
    target.unsetFlag('world', 'darkvisionSpell')
}