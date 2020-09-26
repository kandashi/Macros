Hooks.on("preUpdateToken", async (scene, tokenData, updateData, options) => {
    let hp = getProperty(updateData, "actorData.data.attributes.hp.value")
    let undeadActor = game.actors.get(tokenData.actorId)
    let token = canvas.tokens.get(tokenData._id)
    let feature = undeadActor.items.find(i => i.name === "Undead Fortitude")
    if (hp === 0 && (feature !== null) && !options.skipUndeadCheck) {
        console.log("test");
        let content = `
        <form>
            <div class="form-group">
                <label for="num">Damage to target: </label>
                <input id="num" name="num" type="number" min="0"></input>
            </div>
        </form>`;
        new Dialog({
            title: "Undead Fortitude Save",
            content: content,
            buttons: {
                one: {
                    label: "Radiant Damage or Crit",
                    callback: () => {
                        token.update({hp: 0}, {skipUndeadCheck: true})
                        return;
                    },
                },
                two: {
                    label: "Normal Damage",
                    callback: async (html) => {
                        let roll = await token.actor.rollAbilitySave(`con`);
                        let number = Number(html.find("#num")[0].value);
                        console.log(number)
                        if (roll.total >= (5 + number)) {
                            console.log("survives")
                            token.update({"actorData.data.attributes.hp.value": 1 }, {skipUndeadCheck: true});
                        } else if(roll.total < (5 + number)) {
                            console.log("dies")
                            token.update({"actorData.data.attributes.hp.value": 0}, {skipUndeadCheck: true})
                        }
                },
                },
            },
        }).render(true);
    return false;
    } else return true;
});
