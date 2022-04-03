/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DisLikeModel
 * to integrate with MongoDB
 */
import Dislike from "../models/dislikes/Dislike";
import DislikeModel from "../mongoose/dislikes/DislikeModel";
import DislikeDaoI from "../interfaces/DislikeDaoI";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Users
 * @property {DislikeDao} dislikeDao Private single instance of UserDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    private constructor() {
    }

    /**
     * Uses DislikeModel to retrieve all user from users collection that disliked
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatDisLikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();

    /**
     * Uses DislikeModel to retrieve all tuits from users collection that disliked by user
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuitsDisLikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * Uses DislikeModel to dislike a tuit
     * @returns Promise To be notified tuit is disliked
     * database
     */
    userDisLikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Uses DislikeModel to unclick dislike a tuit
     * @returns Promise To be notified tuit is unclick disliked
     * database
     */
    userUnClickDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

    /**
     * Uses DislikeModel to find all users that disliked a tuit
     * @returns Promise To be notified user is disliked
     * database
     */
    findUserDisLikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});

    /**
     * Uses DislikeModel to find all count of users that disliked a tuit
     * @returns Promise To be notified count of user is disliked
     * database
     */
    countHowManyDisLikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});
}