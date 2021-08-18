if (!game.modules.get("advanced-macros")?.active) { ui.notifications.error("Advanced Macros is not enabled"); return }

if (args[0] === "on" || args[0] === "each") {
    const lastArg = args[args.length - 1];
    let tactor;
    if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
    else tactor = game.actors.get(lastArg.actorId);
    const target = canvas.tokens.get(lastArg.tokenId)
    if (tactor.data.data.traits.di.value.includes("poison")) return
    const flavor = `${CONFIG.DND5E.abilities["con"]} DC${args[1]} Stinking Cloud`;
    let saveRoll = (await tactor.rollAbilitySave("con", { flavor }))?.total;
    if (!saveRoll) return;

    if (saveRoll < args[1]) {
        ChatMessage.create({ content: `${token.name} spends its turn doing nothing` })
    } else {
        ChatMessage.create({ content: `${token.name} saves against Stinking Cloud` })
    }
}