import { fightRepository } from "../repositories/fightRepository.js";
import { fighterService } from "./fighterService.js";

class FightService {
  getAllFights() {
    return fightRepository.getAll();
  }

  getFight(id) {
    const fight = fightRepository.getOne({ id });
    if (!fight) {
      throw { status: 404, message: 'Fight not found' };
    }
    return fight;
  }

  createFight(fighter1Id, fighter2Id) {
    // Validate fighters exist
    const fighter1 = fighterService.getFighter(fighter1Id);
    const fighter2 = fighterService.getFighter(fighter2Id);
    
    // Create fight data
    const fight = {
      fighter1: fighter1Id,
      fighter2: fighter2Id,
      log: []
    };
    
    return fightRepository.create(fight);
  }

  addRound(fightId, round) {
    const fight = this.getFight(fightId);
    
    if (!fight.log) {
      fight.log = [];
    }
    
    fight.log.push(round);
    return fightRepository.update(fightId, { log: fight.log });
  }

  startFight(fighter1Id, fighter2Id) {
    const fighter1 = fighterService.getFighter(fighter1Id);
    const fighter2 = fighterService.getFighter(fighter2Id);
    
    // Create a new fight
    const fight = this.createFight(fighter1Id, fighter2Id);
    
    // Initialize health
    let fighter1Health = fighter1.health;
    let fighter2Health = fighter2.health;
    
    const log = [];
    
    // Simulate fight
    while (fighter1Health > 0 && fighter2Health > 0) {
      // Calculate damage
      const fighter1Damage = this.getDamage(fighter1, fighter2);
      const fighter2Damage = this.getDamage(fighter2, fighter1);
      
      // Apply damage
      fighter2Health = Math.max(0, fighter2Health - fighter1Damage);
      fighter1Health = Math.max(0, fighter1Health - fighter2Damage);
      
      // Log round
      log.push({
        fighter1Shot: fighter1Damage,
        fighter2Shot: fighter2Damage,
        fighter1Health: fighter1Health,
        fighter2Health: fighter2Health
      });
    }
    
    // Update fight with logs
    fightRepository.update(fight.id, { log });
    
    return {
      ...fight,
      log,
      winner: fighter1Health > 0 ? fighter1.name : fighter2.name
    };
  }

  getDamage(attacker, defender) {
    // Power is from 1 to 100
    // Defense is from 1 to 10
    const hitPower = this.getHitPower(attacker);
    const blockPower = this.getBlockPower(defender);
    
    return Math.max(0, hitPower - blockPower);
  }

  getHitPower(fighter) {
    const criticalHitChance = Math.random() + 1; // 1 to 2
    return fighter.power * criticalHitChance;
  }

  getBlockPower(fighter) {
    const dodgeChance = Math.random() + 1; // 1 to 2
    return fighter.defense * dodgeChance;
  }
}

const fightService = new FightService();

export { fightService };
