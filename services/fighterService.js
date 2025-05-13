import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAllFighters() {
    return fighterRepository.getAll();
  }

  getFighter(id) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) {
      throw { status: 404, message: 'Fighter not found' };
    }
    return fighter;
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  createFighter(fighterData) {
    // Check if name is already in use (case insensitive)
    const existingFighter = this.search({ 
      name: new RegExp(`^${fighterData.name}$`, 'i') 
    });
    
    if (existingFighter) {
      throw { message: 'Fighter with this name already exists' };
    }

    // Create fighter
    return fighterRepository.create(fighterData);
  }

  updateFighter(id, fighterUpdateData) {
    // Check if fighter exists
    const fighter = this.getFighter(id);
    
    // If name is changing, check if it's available
    if (fighterUpdateData.name && fighterUpdateData.name.toLowerCase() !== fighter.name.toLowerCase()) {
      const existingFighter = this.search({ 
        name: new RegExp(`^${fighterUpdateData.name}$`, 'i') 
      });
      
      if (existingFighter) {
        throw { message: 'Fighter with this name already exists' };
      }
    }

    // Update fighter
    return fighterRepository.update(id, fighterUpdateData);
  }

  deleteFighter(id) {
    // Check if fighter exists
    this.getFighter(id);
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
