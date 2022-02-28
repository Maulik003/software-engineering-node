/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/bookmarks/:tid to create a new bookmark instance for
 *     a given user</li>
 *     <li>GET /api/users/:uid/bookmarks to retrieve all the bookmarked tuit instances</li>
 *     <li>GET /api/tuits/:tid/bookmarks to retrieve all the users who bookmarked tuit instances</li>
 *     <li>GET /api/users/:uid/bookmarkscheck/:tid to check if the users has bookmarked tuit instances</li>
 *     <li>DELETE /api/users/:uid/bookmarks/:tid to remove a particular bookmarked tuit instance</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmark CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
            app.get("/api/tuits/:tid/bookmarks", BookmarkController.bookmarkController.findAllUserWhoBookmarkedTuit);
            app.get("/api/users/:uid/bookmarkscheck/:tid", BookmarkController.bookmarkController.checkUserBookmarkedTuit);
            app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userUnBookmarksTuit);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {
    }

    /**
     * Retrieves all tuits that are bookmarked by given user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the given user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuits objects
     */
    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Retrieves all users who bookmarked a tuit
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the given user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuits objects
     */
    findAllUserWhoBookmarkedTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllUserWhoBookmarkedTuit(req.params.tid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Checks if one user follows another user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the following user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    checkUserBookmarkedTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.checkUserBookmarkedTuit(req.params.tid, req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Creates a new bookmark instance
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user id and tuit id that
     * is bookmarked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark that was inserted in the
     * database
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.tid, req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Removes a bookmark instance from the database
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user id and tuit id that is
     * bookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmark was successful or not
     */
    userUnBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnBookmarksTuit(req.params.tid, req.params.uid)
            .then(status => res.send(status));

};