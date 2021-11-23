//DAE Macro Execute, Effect Value = "Macro Name" (time of duration)
// Target - Self, clear all spell effects in the Action field

if (args[0] === "off") { 
    let gameUser = game.users.find(u => u.data.character === actor._id)
    let targets = gameUser.targets
    for (let smiteTarget of targets) {
        let effectData = {
            changes: [
                {
                  "key": "flags.midi-qol.disadvantage.attack.all",
                  "mode": 5,
                  "value": "1",
                  "priority": 20
                },
                {
                  "key": "flags.midi-qol.disadvantage.ability.check.all",
                  "mode": 5,
                  "value": "1",
                  "priority": 20
                }
              ],
            label: "Staggering Smite targeted",
            icon: "systems/dnd5e/icons/skills/violet_03.jpg",
            duration: {
                "rounds": 1,
                "turns": 1,
              },
        }
        await smiteTarget.actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
        
    }
}
