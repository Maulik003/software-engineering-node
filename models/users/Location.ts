/**
 * @file Declares Location data type representing relationship between
 * users and location, as in user has location
 */


/**
 * @typedef Location Represents location relationship between a user and its location,
 * as in a user has location
 * @property {number} latitude latitude value
 * @property {number} longitude longitude value
 */

export default interface Location {
    latitude: number,
    longitude: number
};