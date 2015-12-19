import t from 'tcomb';

export const User = t.struct({
    username: t.String
}, 'User');

export const UserCredentials = User.extend({
    password: t.String
}, 'UserCredentials');
