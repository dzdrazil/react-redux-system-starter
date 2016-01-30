import t from 'tcomb';
import {createReducer} from 'redux-create-reducer';

// import actions to respond to
import {
    PETS_LOAD_START,
    PETS_LOAD_SUCCESS,
    PETS_LOAD_FAIL,
    CREATE_PET_START,
    CREATE_PET_SUCCESS,
    CREATE_PET_FAIL
} from '../actions/pets';

// type imported for type checking, naturally
import {PetList} from '../domain/types/Pet';


// define the type parameters for the state
/**
 * @class PetsState
 */
const PetsState = t.struct({
    /**
     * @property
     * @type {Boolean}
     */
    isLoading: t.Boolean,
    /**
     * @property
     * @type {Null|PetList}
     */
    pets: t.maybe(PetList),
    /**
     * @property
     * @param {Null|Error}
     */
    error: t.maybe(t.Error) // loading the user may or may not have errored
}, 'PetsState');

// these states are effectively constant types-
// the application may switch between them, but their values aren't
// in any way dependent upon the action's payload
const INITIAL_STATE = new PetsState({
    isLoading: false,
    pets: null,
    error: null
});

const LOADING_STATE = new PetsState({
    isLoading: true,
    pets: null,
    error: null
});

export default createReducer(INITIAL_STATE, {
    [PETS_LOAD_START]() {
        return LOADING_STATE;
    },

    [PETS_LOAD_FAIL](state, action) {
        return new PetsState({
            isLoading: false,
            error: action.payload.error,
            pets: null
        });
    },

    [PETS_LOAD_SUCCESS](state, action) {
        return new PetsState({
            isLoading: false,
            error: null,
            pets: action.payload
        });
    },

    [CREATE_PET_START](state) {
        return new PetsState({
            isLoading: true,
            error: null,
            pets: state.pets
        });
    },

    [CREATE_PET_SUCCESS](state, action) {
        return new PetsState({
            isLoading: false,
            error: null,
            pets: PetList.update(state.pets, {
                $push: action.payload
            })
        });
    },

    [CREATE_PET_FAIL](state, action) {
        return new PetsState({
            isLoading: false,
            error: action.payload.error,
            pets: state.pets
        });
    }
});
