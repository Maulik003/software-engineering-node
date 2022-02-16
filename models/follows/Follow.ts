/**
 * @file Declares Follow data type representing relationship between
 * users and another user, as in user follows another user
 */

import User from "../users/User";

/**
 * @typedef Like Represents Follows relationship between a user and another User,
 * as in a user follows another user
 * @property {User} userFollowed User being followed
 * @property {User} userFollowing User being following
 */

export default interface Follow {
    userFollowed: User,
    userFollowing: User
};