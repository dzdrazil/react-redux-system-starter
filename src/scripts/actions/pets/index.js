import createAsyncActions from '../createAsyncActions';
import PetService from '../../domain/services/PetService';

/**
 * Call this action to trigger loading pets
 *
 * Triggers the following actions:
 * PETS_LOAD_STARTED
 * PETS_LOAD_SUCCEEDED
 * PETS_LOAD_FAILED
 */
export let fetchPets = createAsyncActions('PETS_LOAD', (dispatchStarted, dispatchSucceeded, dispatchFailed) => {
    return () => dispatch => {
        dispatchStarted(dispatch);

        return PetService
            .getAll()
            .then(petsList => dispatchSucceeded(dispatch, {payload: petsList}))
            .catch(e => {
                console.error(e);
                dispatchFailed(
                    dispatch,
                    {payload: e, error: true}
                );
            });
    };
});

/**
 * createPet
 *
 * Call this action to create a new pet
 *
 * Triggers the following actions:
 * PETS_CREATE_STARTED
 * PETS_CREATE_SUCCEEDED
 * PETS_CREATE_FAILED
 *
 * @param  {Pet} pet
 */
export let createPet = createAsyncActions('PETS_CREATE', (dispatchStarted, dispatchSucceeded, dispatchFailed) => {
    return (pet) => dispatch => {
        dispatch(dispatchStarted(dispatch, {payload: pet}));

        return PetService
            .createPet(pet)
            .then(newPet => dispatchSucceeded(dispatch, {payload: newPet}))
            .catch(e => dispatchFailed(dispatch, {payload: e, error: true}));
    };
});
