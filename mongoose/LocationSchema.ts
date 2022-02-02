import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
    latitude: {type: String, default: 0.0},
    longitude: {type: String, default: 0.0}
}, {collection: 'locations'});
export default LocationSchema;