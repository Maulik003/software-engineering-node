import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/follows/Follow";
import FollowModel from "../mongoose/follows/FollowModel";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {
    }

    findAllUsersThatUserFollows = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

    findAllUsersThatFollowsUser = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

    userUnfollowsAnotherUser = async (uid: string, fuid: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid, userFollowing: fuid});

    userFollowsAnotherUser = async (uid: string, fuid: string): Promise<Follow> =>
        FollowModel.create({userFollowed: uid, userFollowing: fuid});

}