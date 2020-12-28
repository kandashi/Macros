//DAE Macro Execute, Effect Value = "Macro Name" @target 
let target = canvas.tokens.get(args[1])
if (args[0] === "on") {
    await target.actor.createOwnedItem({
        "name": "Goodberry",
        "type": "consumable",
        "data": {
            "description": {
                "value": "Its a goodberry",
                "chat": "",
                "unidentified": ""
            },
            "quantity": 10,
            "weight": 0,
            "price": 0,
            "uses": {
                "value": 1,
                "max": 1,
                "per": "charges",
                "autoDestroy": true
            },
            "consume": {
                "type": "",
                "target": "",
                "amount": null
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
            "formula": "",
            "save": {
                "ability": "",
                "dc": null,
                "scaling": "spell"
            },
            "consumableType": "food"
        },
        "sort": 15200000,
        "img": "icons/commodities/flowers/buds-black-red.webp",
        "effects": [],
        "_id": "GGuFo8wKnyQWHmVc"
    })
}
if (args[0] === "off") {
    ChatMessage.create({content: "The batch of goodberries expire"})
}
