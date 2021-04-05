//Set as a midi qol "OnUse" macro
// change the spell damage type to "no damage"
// Set the macro as "run as GM"

let sleepHp = args[0].damageTotal;

if(!sleepHp) {
  ui.notifications.error("No arguments passed to Sleep macro");
  return;
}
console.log(`starting Sleep macro with sleepHp[${sleepHp}]`);

// Get Targets
let targets = args[0].targets
let newTargets = targets.map(a => canvas.tokens.get(a._id))

// Sort targets by HP ascending
newTargets = newTargets.sort(function(a, b) {
  const hpValueOfA = a.actor.data.data.attributes.hp.value;
  const HpValueOfB = b.actor.data.data.attributes.hp.value;
  return hpValueOfA - HpValueOfB;
});

let remainingSleepHp = sleepHp;
const condition = "Unconscious";
for(let target of newTargets) {
  // Skip targets already unconscious
  if(await game.cub.hasCondition(condition, target.actor)) {
    console.log(`${target.actor.name} is already asleep, skipping it.`);
    continue;
  }

  let targetHpValue = target.actor.data.data.attributes.hp.value;
  if(remainingSleepHp > targetHpValue) {
    remainingSleepHp -= targetHpValue;
    console.log(`${target.actor.name} with hp ${targetHpValue} falls asleep, remaining hp from dice ${remainingSleepHp}.`);
    // Apply unconscious condition to target
    game.cub.addCondition(condition, target.actor);
  } else {
    console.log(`${target.actor.name} with hp ${targetHpValue} resists asleep, skipping remaining targets.`);
    break;
  }
}
