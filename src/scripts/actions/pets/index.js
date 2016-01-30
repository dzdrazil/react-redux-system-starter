import createAsyncAction from '../createAsyncAction';
import PetService from '../../domain/services/PetService';


export const PETS_LOAD_START = 'pets-load-start';
export const PETS_LOAD_SUCCESS = 'pets-load-success';
export const PETS_LOAD_FAIL = 'pets-load-fail';

/**
 * Fetch all pets in the system
 * @function fetchPets
 * @return {PetList}    Array of pet models
 */
export const fetchPets = createAsyncAction({
    types: [PETS_LOAD_START, PETS_LOAD_SUCCESS, PETS_LOAD_FAIL],
    invoke: () => PetService.getAll()
});


export const CREATE_PET_START = 'create-pet-start';
export const CREATE_PET_SUCCESS = 'create-pet-success';
export const CREATE_PET_FAIL = 'create-pet-fail';

/**
 * Create a new pet
 * @function createPet
 * @param  {Pet} pet tcomb pet type
 * @return {Pet} Server response cast as a tcomb pet type
 */
export const createPet = createAsyncAction({
    types: [CREATE_PET_START, CREATE_PET_SUCCESS, CREATE_PET_FAIL],
    invoke: pet => PetService.createPet(pet),
    metaData: ['pet']
});
