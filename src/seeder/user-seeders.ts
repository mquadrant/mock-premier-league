import User from '../models/users'
// Constructing each user in an array
const users = [
    new User({
        _id: '5d4155cfcd68f4086d8df490',
        firstName: 'Ahmed',
        lastName: 'Taiwo',
        email: 'ahmed@gmail.com',
        password: '1234ahmed',
        club: '5d4155cfcd68f4086d8df471',
        role: 'USER',
    }),
    new User({
        _id: '5d4155cfcd68f4086d8df491',
        firstName: 'Segun',
        lastName: 'Arinze',
        email: 'segun12@gmail.com',
        password: '1234segun',
        club: '5d4155cfcd68f4086d8df472',
        role: 'USER',
    }),
    new User({
        _id: '5d4155cfcd68f4086d8df492',
        firstName: 'Benjamin',
        lastName: 'Mark',
        email: 'mquadrant@gmail.com',
        password: 'markben',
        club: '5d4155cfcd68f4086d8df473',
        role: 'ADMIN',
    }),
]

export default users
