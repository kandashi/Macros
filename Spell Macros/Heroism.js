//DAE Macro Execute, Effect Value = "Macro Name" @target @abilities.(insert casting score).mod


let mod = args[2];
let target = canvas.tokens.get(args[1]);

if (args[0] === "on") {
    ChatMessage.create({ content: "Heroism is applied to targets" })
    const hookId = Hooks.on("updateCombat", (combat, update) => {
        if (!("round" in update || "turn" in update)) return;
        if (combat.combatant.tokenId === args[1]) {
            target.actor.update({ "data.attributes.hp.temp": mod });
            ChatMessage.create({ content: "Heroism continues on " + target.name })
        }
    });
    target.actor.setFlag("world", "heroismUpdateCombatHookId", hookId);

}
if (args[0] === "off") {
   let hookIdFlag = target.actor.getFlag("world", "heroismUpdateCombatHookId");
    ChatMessage.create({ content: "Heroism ends" });
    Hooks.off("updateCombat", hookIdFlag);
    target.actor.unsetFlag("world", "heroismUpdateCombatHookId");
}