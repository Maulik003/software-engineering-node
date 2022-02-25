/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */

import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/follows/Follow";
import FollowModel from "../mongoose/follows/FollowModel";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns UserDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {
    }

    /**
     * Uses FollowModel to retrieve all Users documents that given user follows
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatUserFollows = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

    /**
     * Uses FollowModel to retrieve all Users documents that follows given user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatFollowsUser = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

    /**
     * Removes follow instance into the database
     * @param {string} uid User's primary key
     * @param {string} fuid Other User's primary key
     * @returns Promise To be notified when follow is removed into the database
     */
    userUnfollowsAnotherUser = async (uid: string, fuid: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: fuid, userFollowing: uid});

    /**
     * Inserts follow instance into the database
     * @param {string} uid User's primary key
     * @param {string} fuid Other User's primary key
     * @returns Promise To be notified when follow is inserted into the database
     */
    userFollowsAnotherUser = async (uid: string, fuid: string): Promise<Follow> =>
        FollowModel.create({userFollowed: fuid, userFollowing: uid});

}