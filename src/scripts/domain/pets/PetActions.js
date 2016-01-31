export const PETS_LOAD_START = 'pets-load-start';
/**
 * Fetch all pets in the system
 * @function fetchPets
 * @return {PetList}    Array of pet models
 */
export const fetchPets = () => ({
    type: PETS_LOAD_START
});


export const PETS_LOAD_SUCCESS = 'pets-load-success';
export const fetchPetsSuccess = pets => ({
    type: PETS_LOAD_SUCCESS,
    payload: pets
});

export const PETS_LOAD_FAIL = 'pets-load-fail';
export const fetchPetsFail = e => ({
    type: PETS_LOAD_FAIL,
    payload: e,
    error: true
});


/**
 * Create a new pet
 * @function createPet
 * @param  {Pet} pet tcomb pet type
 * @return {Pet} Server response cast as a tcomb pet type
 */

export const CREATE_PET_START = 'create-pet-start';
export const createPet = pet => ({
    type: CREATE_PET_START,
    payload: pet
});

export const CREATE_PET_SUCCESS = 'create-pet-success';
export const createPetSuccess = newPet => ({
    type: CREATE_PET_SUCCESS,
    payload: newPet
});

export const CREATE_PET_FAIL = 'create-pet-fail';
export const createPetFail = e => ({
    type: CREATE_PET_FAIL,
    payload: e,
    error: true
});
