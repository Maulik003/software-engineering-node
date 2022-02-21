/**
 * @file Declares User data type representing relationship between
 * users and Tuit, as in user posts tuit
 */

import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

/**
 * @typedef User Represents user relationship between a user and another user,
 * as in a user messages another user, user follows another user, etc.
 * @property {String} username username of user
 * @property {String} password password of user
 * @property {String} firstname firstname of user
 * @property {String} lastname lastname of user
 * @property {String} email email of user
 * @property {String} profilePhoto profilePhoto of user
 * @property {String} headerImage headerImage of user
 * @property {String} biography biography of user
 * @property {Date} dateOfBirth dateOfBirth of user
 * @property {AccountType} accountType accountType of user
 * @property {MaritalStatus} maritalStatus maritalStatus of user
 * @property {Location} location location of user
 * @property {number} salary salary of user
 */

export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number
};