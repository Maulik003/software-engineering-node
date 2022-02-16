/**
 * @file Declares Message data type representing relationship between
 * users and another user, as in user messages another user
 */

import User from "../users/User";

/**
 * @typedef Like Represents messages relationship between a user and another user,
 * as in a user messages another user
 * @property {String} message message to be sent
 * @property {User} to User who receives
 * @property {User} from User who sends
 * @property {Date} sentOn message sent Date
 */

export default interface Message {
    message: String,
    to: User,
    from: User,
    sentOn: Date
};