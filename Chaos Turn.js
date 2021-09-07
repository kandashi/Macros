//tzeentch
params = [{
    filterType: "field",
    filterId: "myDrawing",
    shieldType: 12,
    gridPadding: 2,
    color: 0xFFFFFF,
    time: 0,
    blend: 2,
    intensity: 1.5,
    lightAlpha: 0.2,
    lightSize: 0.1,
    scale: 1,
    radius: 1,
    chromatic: false,
    animated:
    {
        time:
        {
            active: true,
            speed: 0.0003,
            animType: "move"
        }
    }
}]
params = [{
    filterType: "glow",
    filterId: "tileGlow",
    outerStrength: 55,
    innerStrength: 0,
    color: 0x22AF16,
    quality: 0.1,
    padding: 50,
    animated:
    {
        color:
        {
            active: true,
            loopDuration: 2000,
            animType: "colorOscillation",
            val1: 0x22AF16,
            val2: 0x8BF782
        }
    }
}, {
    filterType: "distortion",
    filterId: "myDistortion",
    maskPath: "modules/tokenmagic/fx/assets/distortion-1.png",
    maskSpriteScaleX: 2,
    maskSpriteScaleY: 2,
    padding: 20,
    animated:
    {
        maskSpriteX: { active: true, speed: 0.05, animType: "move" },
        maskSpriteY: { active: true, speed: 0.07, animType: "move" }
    }
}];

//nurgle
[{
    filterType: "fumes",
    filterId: "myDrawing",
    color: 0x22AF16,
    time: 0,
    blend: 10,
    animated:
    {
        time:
        {
            active: true,
            speed: 0.003,
            animType: "move"
        }
    }
}];

colour = "#22AF16"
opacity = 0.2
params = [{
    filterType: "glow",
    filterId: "tileGlow",
    outerStrength: 55,
    innerStrength: 0,
    color: 0x22AF16,
    quality: 0.1,
    padding: 50,
    animated:
    {
        color:
        {
            active: true,
            loopDuration: 2000,
            animType: "colorOscillation",
            val1: 0x04FFC0,
            val2: 0x048BFF
        }
    }
}, {
    filterType: "distortion",
    filterId: "myDistortion",
    maskPath: "modules/tokenmagic/fx/assets/distortion-1.png",
    maskSpriteScaleX: 2,
    maskSpriteScaleY: 2,
    padding: 20,
    animated:
    {
        maskSpriteX: { active: true, speed: 0.05, animType: "move" },
        maskSpriteY: { active: true, speed: 0.07, animType: "move" }
    }
}];
//khorne
let params =
    [{
        filterType: "wave",
        filterId: "myDrawing",
        time: 0,
        strength: 0.8,
        frequency: 15,
        maxIntensity: 5.0,
        minIntensity: 0.5,
        padding: 25,
        animated:
        {
            time:
            {
                active: true,
                speed: 0.01,
                animType: "move",
            }
        }
    }];
params = [{
    filterType: "glow",
    filterId: "tileGlow",
    outerStrength: 55,
    innerStrength: 0,
    color: 0x22AF16,
    quality: 0.1,
    padding: 50,
    animated:
    {
        color:
        {
            active: true,
            loopDuration: 2000,
            animType: "colorOscillation",
            val1: 0xB32D1D,
            val2: 0xFF1F04
        }
    }
}, {
    filterType: "distortion",
    filterId: "myDistortion",
    maskPath: "modules/tokenmagic/fx/assets/distortion-1.png",
    maskSpriteScaleX: 2,
    maskSpriteScaleY: 2,
    padding: 20,
    animated:
    {
        maskSpriteX: { active: true, speed: 0.05, animType: "move" },
        maskSpriteY: { active: true, speed: 0.07, animType: "move" }
    }
}];
//slaanesh
let params =
[{
    filterType: "field",
    filterId: "myDrawing",
    shieldType: 6,
    gridPadding: 2,
    color: 0xc74ff3,
    time: 0,
    blend: 2,
    intensity: 1,
    lightAlpha: 0,
    lightSize: 0.3,
    scale: 0.5,
    radius: 1,
    chromatic: true,
    alphaDiscard: true,
    discardThreshold: 0.3,
    zOrder: 512,
    animated:
    {
        time:
        {
            active: true,
            speed: 0.0009,
            animType: "move"
        }
    }
}];

params = [{
    filterType: "glow",
    filterId: "tileGlow",
    outerStrength: 55,
    innerStrength: 0,
    color: 0x22AF16,
    quality: 0.1,
    padding: 50,
    animated:
    {
        color:
        {
            active: true,
            loopDuration: 2000,
            animType: "colorOscillation",
            val1: 0xFF04FE,
            val2: 0x8A04FF
        }
    }
}, {
    filterType: "distortion",
    filterId: "myDistortion",
    maskPath: "modules/tokenmagic/fx/assets/distortion-1.png",
    maskSpriteScaleX: 2,
    maskSpriteScaleY: 2,
    padding: 20,
    animated:
    {
        maskSpriteX: { active: true, speed: 0.05, animType: "move" },
        maskSpriteY: { active: true, speed: 0.07, animType: "move" }
    }
}];


TokenMagic.addPreset({name: "NurgleDrawing", library: "wf5e"},  [{
    filterType: "fumes",
    filterId: "myDrawing",
    color: 0x22AF16,
    time: 0,
    blend: 10,
    animated:
    {
        time:
        {
            active: true,
            speed: 0.003,
            animType: "move"
        }
    }
}])