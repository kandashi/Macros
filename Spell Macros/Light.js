let target = canvas.tokens.get(args[1]);

if (args[0] === "on") {
    target.update({ "dimLight": 40, "brightLight": 20})

} else {
    target.update({ "dimLight": 0, "brightLight": 0})
};