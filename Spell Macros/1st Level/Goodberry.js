//DAE Macro
// self target, duration of instantaneous
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);

if (args[0] === "on") {
    ui.notifications.notify("A batch of goodberries has been placed in your inventory")

    await tactor.createOwnedItem({
        "name": "Goodberries",
        "type": "consumable",
        "data": {
            "description": {
                "value": "Its a goodberry",
            },
            "quantity": 10,
            "uses": {
                "value": 1,
                "max": 1,
                "per": "charges",
                "autoDestroy": true
            },
            "damage": {
                "parts": [
                    [
                        "1",
                        "healing"
                    ]
                ],
                "versatile": ""
            },
            "consumableType": "food"
        },
        "img": "icons/commodities/flowers/buds-black-red.webp",
    })
}
game.Gametime.doIn({ hours: 24 }, async () => {
    let removeItem = tactor.items.find(i => i.name === "Goodberries")
    if (removeItem) {
        await tactor.deleteOwnedItem(removeItem.id);
        ui.notifications.notify("The batch of goodberries expire")
    }
});
