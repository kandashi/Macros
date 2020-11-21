/// this will search for a token with the feature "Aura of Protection" and create/update active effects on all PC class actors within 10ft of that token
//run on startup/refresh 
//ONLY RUN ONCE


ui.notifications.info("Aura of Protection Active");
function createPlayerTable() {
    let playerTable = [];
    let playerCount = 0;
    for (let i = 0; i < canvas.tokens.placeables.length; i++) {
        let token = canvas.tokens.placeables[i];
        let actor = game.actors.get(token.actor.data._id);
        if (actor.isPC == true) {
            playerTable.push([]);
            playerTable[playerCount].push(actor);
            playerCount++;
        }
    }
    return playerTable;
}

function auraCheck(playerTable, index) {
    var auraName = "Aura of Protection";
    for (let j = 0; j < playerTable[index][0].data.items.length; j++) {
        var abilityName = playerTable[index][0].data.items[j].name;
        var result = auraName.localeCompare(abilityName);
        if (result == 0)
            return true;
    }
    return false;
}

function inRange(token1, token2) {
    let gs = canvas.grid.size;
    let d1 = Math.abs((token1[0]._validPosition.x - token2[0]._validPosition.x) / gs);
    let d2 = Math.abs((token1[0]._validPosition.y - token2[0]._validPosition.y) / gs);
    let dist = Math.max(d1, d2);
    dist = dist * canvas.scene.data.gridDistance;
    if (dist <= 10)
        return true;
    return false;
}

function newSave(actor2, playerTable) {
    let auraTable = [];
    let saveBonus = 0;
    for (let i = 0; i < playerTable.length; i++) {
        let actor1 = playerTable[i][0];
        let actorHasAura = auraCheck(playerTable, i);
        if (actorHasAura == true) {
            let auraSource = game.actors.get(actor1._id);
            auraTable.push(auraSource);
        }
    }
    let token2 = game.actors.get(actor2._id).getActiveTokens();
    for (let k = 0; k < auraTable.length; k++) {
        if (inRange(auraTable[k].getActiveTokens(), token2) == true) {
            if (auraTable[k].data.data.abilities.cha.mod >= saveBonus) {
                saveBonus = auraTable[k].data.data.abilities.cha.mod;
            }
        }
    }
    return saveBonus;
}

function createActiveEffect(actor, newSave) {
    console.log(newSave)
    let aura = actor.effects.find(i => i.data.label === "Aura of Protection");
    if (aura !== null) {
        let changes = aura.data.changes;
        changes[0].value = newSave
        aura.update({ changes });
    } else {
        let effectData = {
            label: "Aura of Protection",
            icon: "",
            changes: [{
                "key": "data.bonuses.abilities.save",
                "mode": 2,
                "value": newSave,
                "priority": "20"
            }]
        }
        actor.createEmbeddedEntity("ActiveEffect", effectData);
    }
}

function updateActor() {
    let playerTable = createPlayerTable();
    for (let i = 0; i < playerTable.length; i++) {
        let actor2 = playerTable[i][0];
        let token2 = playerTable[i][1];
        let save = newSave(actor2, playerTable)
        let actor = game.actors.get(actor2._id)
        console.log("Aura update")
        createActiveEffect(actor, save)
    }
    return;
}

Hooks.on("updateToken", (scene, token, update, flags, id) => {
    let movement = getProperty(update, "x") || getProperty(update, "y");
    if (movement !== undefined) {
        updateActor();
    }
})
