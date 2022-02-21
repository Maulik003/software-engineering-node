/**
 * @file Declares Tuit data type representing relationship between
 * users and Tuit, as in user posts tuit
 */

import User from "../users/User";

/**
 * @typedef Tuit Represents Tuits relationship between a user and a tuit,
 * as in a user posts a tuit
 * @property {String} tuit tuit to be posted
 * @property {User} postedBy User who posts the tuit
 * @property {Date} postedOn Tuit posted Date
 */

export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
};