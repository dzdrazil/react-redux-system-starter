import t from 'tcomb';

import {Password} from '../base/Password';

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
    password: Password
}, 'UserCredentials');
