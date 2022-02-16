/**
 * @file Implements mongoose model to CRUD
 * documents in the bookmarks collection
 */
import mongoose from "mongoose";
import BookmarkSchema from "./BookmarkSchema";

const BookmarkModel = mongoose.model("LikeModel", BookmarkSchema);
export default BookmarkModel;