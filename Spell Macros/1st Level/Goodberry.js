//DAE Item Macro
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);

if (args[0] === "on") {
    await tactor.createOwnedItem({
        "name": "Goodberry",
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
if (args[0] === "off") {
    ChatMessage.create({content: "The batch of goodberries expire"})
}
