/**
 * @file Declares API for Follows related data access object methods
 */
import Follow from "../models/follows/Follow";

export default interface FollowDaoI {
    findAllUsersThatUserFollows(uid: string): Promise<Follow[]>;

    findAllUsersThatFollowsUser(uid: string): Promise<Follow[]>;

    userUnfollowsAnotherUser(uid: string, fuid: string): Promise<any>;

    userFollowsAnotherUser(uid: string, fuid: string): Promise<Follow>;
};