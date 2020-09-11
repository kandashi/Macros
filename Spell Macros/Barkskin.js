let target = canvas.tokens.get(args[1]);
let armour = target.actor.data.data.attributes.ac.value

if (args[0] === "on") {
    let newArmour = armour <= 16 ? 16 : armour
    console.log(newArmour)
    target.setFlag('world', 'barkskin', armour)
    target.actor.update({ "data.attributes.ac.value" : newArmour })
} else {
    let newArmour = target.getFlag('world', 'barkskin');
    target.actor.update({ "data.attributes.ac.value" : newArmour });
    target.unsetFlag('world', 'barkskin')
}