/**
 * @file Declares API for Bookmarks related data access object methods
 */
import Bookmark from "../models/bookmarks/Bookmark";

export default interface BookmarkDaoI {

    findAllTuitsBookmarkedByUser(uid: string): Promise<Bookmark[]>;

    findAllUserWhoBookmarkedTuit(tid: string): Promise<Bookmark[]>;

    checkUserBookmarkedTuit(tid: string, uid: string): Promise<Boolean>;

    userUnBookmarksTuit(tid: string, uid: string): Promise<any>;

    userBookmarksTuit(tid: string, uid: string): Promise<Bookmark>;
};