if (args[0] === "off") {
    let effect = actor.effects.find(i => i.data.label === "Branding Smite");
    let timeRemaining = args[1] - (effect.duration.total - effect.duration.remaining);
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