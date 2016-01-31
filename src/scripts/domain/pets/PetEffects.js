import PetRepository from './PetRepository';

import {
    fetchPetsSuccess,
    fetchPetsFail,
    createPetSuccess,
    createPetFail
} from './PetActions';

export const loadPets = () => PetRepository
    .getAll()
    .then(petList => fetchPetsSuccess(petList))
    .catch(e => fetchPetsFail(e));

export const createPet = pet => PetRepository
    .createPet(pet)
    .then(newPet => createPetSuccess(newPet))
    .catch(e => createPetFail(e));
