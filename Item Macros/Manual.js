let item = token.actor.items.find(i => i.name === "Manual of Bodily Health");
if (item.getFlag('world', 'manualOfBodilyHealth') >= 48) {

} else {
    let content = `<p>How many hours are you spending?</p>
                    <form>
                        <div class="form-group">
                            <label>Type amount of hours:  </label>
                            <input name="num"></input>
                        </div>
                    </form>`;
    new Dialog({
        title: "Hours studied",
        content: content,
        buttons: {
            one: {
                label: "Learn!",
                callback: () => confirmed = true
            },
            two: {
                label: "Cancel",
                callback: () => confirmed = false
            }
        },
        default: "Cancel",
        close: html => {
            if (confirmed) {
                let number = html.find('[name=num]')[0].value;
                if(isNaN(number)) return ui.notifications.error(`Must input numbers only.`);
                
                updateMacro.execute(targetData.actor.name, {
                    "data.attributes.hp.value" : Math.clamped(
                        targetData.actor.data.data.attributes.hp.value + Number(number),
                        0, targetData.actor.data.data.attributes.hp.max)
                });
                featUpdate.data.uses.value = featUpdate.data.uses.value - (Number(number)-1);
                actorData.updateEmbeddedEntity("OwnedItem", featUpdate);
            }
        }
    }).render(true);
});
    }