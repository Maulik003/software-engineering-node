import express, {Request, Response} from 'express';
import mongoose from "mongoose";

mongoose.connect('mongodb+srv://Maulik003:Maulik123@cluster0.qcvyx.mongodb.net/Tuiter?retryWrites=true&w=majority');
import bodyParser from "body-parser";
import UserController from "./controller/UserController";
import TuitController from "./controller/TuitController";

const app = express();
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);