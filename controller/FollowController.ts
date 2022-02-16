import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/users/:uid/following", FollowController.followController.findAllUsersThatUserFollows);
            app.get("/api/users/:uid/followed", FollowController.followController.findAllUsersThatFollowsUser);
            app.post("/api/users/:uid/follows/:fuid", FollowController.followController.userFollowsAnotherUser);
            app.delete("/api/users/:uid/unfollows/:fuid", FollowController.followController.userUnfollowsAnotherUser);
        }
        return FollowController.followController;
    }

    private constructor() {
    }

    findAllUsersThatUserFollows = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatUserFollows(req.params.uid)
            .then(follows => res.json(follows));

    findAllUsersThatFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatFollowsUser(req.params.uid)
            .then(follows => res.json(follows));

    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAnotherUser(req.params.uid, req.params.fuid)
            .then(status => res.send(status));

    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid, req.params.fuid)
            .then(follows => res.json(follows));

};