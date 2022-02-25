/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/follows/:fuid to create a new follow instance for
 *     given users</li>
 *     <li>GET /api/users/:uid/following to retrieve all the user instances that given user follows</li>
 *     <li>GET /api/users/:uid/followed to retrieve all the user instances that given user followed by</li>
 *     <li>GET /api/users/:uid/followcheck/:fuid to check all one user follows another user</li>
 *     <li>GET /api/users/:uid/followedcheck/:fuid to check all one user follows another user</li>
 *     <li>DELETE /api/users/:uid/unfollows/:fuid to remove a particular follow instance</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follow CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/users/:uid/following", FollowController.followController.findAllUsersThatUserFollows);
            app.get("/api/users/:uid/followed", FollowController.followController.findAllUsersThatFollowsUser);
            app.get("/api/users/:uid/followcheck/:fuid", FollowController.followController.checkUserFollowsAnotherUser);
            app.get("/api/users/:uid/followedcheck/:fuid", FollowController.followController.checkUserIsFollowedByAnotherUser);
            app.post("/api/users/:uid/follows/:fuid", FollowController.followController.userFollowsAnotherUser);
            app.delete("/api/users/:uid/unfollows/:fuid", FollowController.followController.userUnfollowsAnotherUser);
        }
        return FollowController.followController;
    }

    private constructor() {
    }

    /**
     * Retrieves all users that given user follows
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the following user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatUserFollows = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatUserFollows(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all users that follows given user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the following user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatFollowsUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Checks if one user follows another user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the following user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    checkUserFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.checkUserFollowsAnotherUser(req.params.uid, req.params.fuid)
            .then(follows => res.json(follows));

    /**
     * Checks if one user is followed by another user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the following user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    checkUserIsFollowedByAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.checkUserIsFollowedByAnotherUser(req.params.uid, req.params.fuid)
            .then(follows => res.json(follows));

    /**
     * Removes a follow instance from the database
     * @param {Request} req Represents request from client, including the
     * path parameters uid and fuid representing the user that is unfollowing
     * the other user
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAnotherUser(req.params.uid, req.params.fuid)
            .then(status => res.send(status));

    /**
     * Creates a new follow instance
     * @param {Request} req Represents request from client, including the
     * path parameters uid and fuid representing the user that is following
     * the other user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follow that was inserted in the
     * database
     */
    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid, req.params.fuid)
            .then(follows => res.json(follows));

};