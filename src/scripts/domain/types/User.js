import t from 'tcomb';

/**
 * @class User
 */
export const User = t.struct({
    /**
     * @property username
     * @type {String}
     */
    username: t.String
}, 'User');

/**
 * @class UserCredentials
 */
export const UserCredentials = User.extend({
    /**
     * @property password
     * @type {String}
     */
    password: t.String
}, 'UserCredentials');
