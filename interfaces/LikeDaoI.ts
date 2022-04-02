import Like from "../models/likes/Like";
import Dislike from "../models/dislikes/Dislike";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface LikeDaoI {
    findAllUsersThatLikedTuit (tid: string): Promise<Like[]>;
    findAllTuitsLikedByUser (uid: string): Promise<Like[]>;
    userUnlikesTuit (tid: string, uid: string): Promise<any>;
    userLikesTuit (tid: string, uid: string): Promise<Like>;

    findUserLikesTuit (uid: string, tid: string): Promise<Like[]>;
    findUserDisLikesTuit (uid: string, tid: string): Promise<Dislike[]>;
};