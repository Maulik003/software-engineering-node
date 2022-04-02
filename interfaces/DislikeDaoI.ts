import Dislike from "../models/dislikes/Dislike";
import Like from "../models/likes/Like";

/**
 * @file Declares API for DisLikes related data access object methods
 */
export default interface DislikeDaoI {

    findAllUsersThatDisLikedTuit(tid: string): Promise<Dislike[]>;

    findAllTuitsDisLikedByUser(uid: string): Promise<Dislike[]>;

    findUserDisLikesTuit(uid: string, tid: string): Promise<Dislike[]>;

    countHowManyDisLikedTuit(tid: string): Promise<any>;

    userDisLikesTuit(tid: string, uid: string): Promise<any>;

    userUnClickDislikesTuit(tid: string, uid: string): Promise<Dislike>;
};