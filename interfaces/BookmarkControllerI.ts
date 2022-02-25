/**
 * @file Declares Controllers for Bookmarks related api methods
 */
import {Request, Response} from "express";

export default interface BookmarkControllerI {
    findAllTuitsBookmarkedByUser(req: Request, res: Response): void;

    findAllUserWhoBookmarkedTuit(req: Request, res: Response): void;

    checkUserBookmarkedTuit(req: Request, res: Response): void;

    userUnBookmarksTuit(req: Request, res: Response): void;

    userBookmarksTuit(req: Request, res: Response): void;
};