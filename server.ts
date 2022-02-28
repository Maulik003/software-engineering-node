/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>bookmarks</li>
 *     <li>follows</li>
 *     <li>messages</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import UserController from "./controller/UserController";
import TuitController from "./controller/TuitController";
import LikeController from "./controller/LikeController";
import BookmarkController from "./controller/BookmarkController";
import FollowController from "./controller/FollowController";
import MessageController from "./controller/MessageController";

// build the connection string
const PROTOCOL = "mongodb+srv";
// const DB_USERNAME = process.env.DB_USERNAME;
// const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USERNAME = "Maulik003";
const DB_PASSWORD = "Maulik123";
const HOST = "cluster0.qcvyx.mongodb.net";
const DB_NAME = "Tuiter";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
// mongoose.connect('mongodb+srv://Maulik003:Maulik123@cluster0.qcvyx.mongodb.net/Tuiter?retryWrites=true&w=majority');
// connect to the database
mongoose.connect(connectionString);

const app = express();
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

// create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const bookmarksController = BookmarkController.getInstance(app);
const followsController = FollowController.getInstance(app);
const messageController = MessageController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);