if (args[0] === "off") {
    let effect = actor.effects.find(i => i.data.label === "Staggering Smite");
    let timeRemaining = args[1] - (effect.duration.duration - effect.duration.remaining);
    let gameUser = game.users.find(u => u.data.character === actor._id)
    let targets = gameUser.targets
    for (let smiteTarget of targets) {
        debugger
        smiteTarget.update({ "brightLight": 5 });
        game.Gametime.doIn({ seconds: timeRemaining }, async () => {
            smiteTarget.update({ "brightLight": 0 });
        });
    }
}
[
    {    "changes": [
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
        "disabled": false,
        "duration": {
          "rounds": 1,
          "turns": 1,
        },
        "icon": "systems/dnd5e/icons/skills/violet_03.jpg",
        "label": "Staggering Smite targeted",
      }
    ]