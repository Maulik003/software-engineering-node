import mongoose from "mongoose";
import UserSchema from "./UserSchema";

const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedOn: Date,
    postedBy: UserSchema
}, {collection: 'tuits'});
export default TuitSchema;