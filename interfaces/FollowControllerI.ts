/**
 * @file Declares Controllers for Follows related api methods
 */
import {Request, Response} from "express";

export default interface FollowControllerI {
    findAllUsersThatUserFollows(req: Request, res: Response): void;

    findAllUsersThatFollowsUser(req: Request, res: Response): void;

    userUnfollowsAnotherUser(req: Request, res: Response): void;

    userFollowsAnotherUser(req: Request, res: Response): void;

    checkUserFollowsAnotherUser(req: Request, res: Response): void;
};