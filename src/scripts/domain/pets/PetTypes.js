import t from 'tcomb';

/**
 * @class Pet
 */
export const Pet = t.struct({
    /**
     * @property id
     * @type {Number}
     */
    id: t.Number,

    /**
     * @property name
     * @type {String}
     */
    name: t.String,

    /**
     * @property tag
     * @type {String}
     */
    tag: t.String
});


/**
 * @class PetArrays
 */
export const PetList = t.list(Pet);
