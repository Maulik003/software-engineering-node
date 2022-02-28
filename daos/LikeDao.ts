/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */

import LikeDaoI from "../interfaces/LikeDaoI";
import Like from "../models/likes/Like";
import LikeModel from "../mongoose/likes/LikeModel";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {
    }

    /**
     * Uses LikeModel to retrieve all Users documents that like given tuit
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Uses LikeModel to retrieve all tuits documents that like given user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * Inserts like instance into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when like is inserted into the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Removes like instance into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when like is removed into the database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}