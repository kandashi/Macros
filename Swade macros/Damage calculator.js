let content = `
<style>
.damageCard .flex-grid {
    display: flex;
  }
  .col {
    flex: 1;
  }
.damageCard img {
    
}
</style>
`
new Dialog({
    title: "SWADE Damage Calculation",
    content: `
    <label for="damage">Damage Value</label>
    <input type="number" id="damage">
    <label for="ap">AP</label>
    <input type="number" id="ap">
    `,
    buttons: {
        one: {
            label: "Calculate",
            callback: (html) => {
                let damage = Number(html.find("#damage")[0].value)
                let ap = Number(html.find("#ap")[0].value)
                let targets = canvas.tokens.controlled
                for (let target of targets) {
                    const { armor, modifier, value } = target.actor.data.data.stats.toughness
                    let apNeg = Math.min(ap, armor)
                    let newT = value - apNeg
                    let excess = damage - newT

                    if (excess < 0) {
                        content = `
                        <div class="damageCard">
                        <div class="flex-grid">
                            <div class="col">
                                <img src="systems/swade/assets/icons/status/status_defending.svg">
                            </div>
                            <div class="col">
                                <div class="row"> ${target.name} is</div>
                                <div class="row"> Not Harmed
                            </div>
                        </div>
                        </div>`
                    }
                    else if (excess >= newT) {
                        content = `
                        <div class="damageCard">
                        <div class="flex-grid">
                        <div class="col">
                            <img class="blood" src="icons/svg/blood.svg">
                        </div>
                        <div class="col">
                            <div class="row">${target.name} takes</div>
                            <div class="row">${Math.floor(excess/newT)} wounds
                        </div>
                    </div>
                    </div>
                     `
                    }
                    else if (excess < newT) {
                        content = `
                        <div class="damageCard">
                        <div class="flex-grid">
                        <div class="col">
                            <img src="systems/swade/assets/icons/status/status_shaken.svg">
                        </div>
                        <div class="col">
                            <div class="row"> ${target.name} is</div>
                            <div class="row"> Shaken
                        </div>
                    </div>
                    </div>`
                    }
                    
                    ChatMessage.create({ content: content })
                }
            }
        }
    }
}).render(true)