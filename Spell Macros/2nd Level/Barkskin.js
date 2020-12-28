//DAE Macro Execute, Effect Value = "Macro Name" @target 
//item must have disabled passive effect of the correct armor calculation field

let target = canvas.tokens.get(args[1]); // grab token
let armour = target.actor.data.data.attributes.ac.value;

if (args[0] === "on") {
    if (armour < 16) { // measure ac value
        DynamicEffects.togglePassive("Barkskin", spell); // toggle barkskins passive
        ChatMessage.create({ content: target.name + "'s AC is increased to 16" });
    }

}
if (args[0] === "off") {
    let effect = target.actor.effects.find(i => i.name === "Barkskin"); //find barkskin active effect
    if (!effect.data.disabled) { // if active, turn off
        DynamicEffects.togglePassive("Barkskin", spell);
        ChatMessage.create({ content: target.name + "'s AC is returned" });
    }
}
