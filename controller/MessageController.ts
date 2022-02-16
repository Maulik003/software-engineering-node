import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/api/users/:uid/messages/sent", MessageController.messageController.findAllMessagesThatUserSent);
            app.get("/api/users/:uid/messages/received", MessageController.messageController.findAllMessagesThatSentToUser);
            app.post("/api/users/:uid/messages/:fuid", MessageController.messageController.userMessagesAnotherUser);
            app.delete("/api/users/:uid/messages/:fuid", MessageController.messageController.userDeletesMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {
    }

    findAllMessagesThatUserSent = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesThatUserSent(req.params.uid)
            .then(messages => res.json(messages));

    findAllMessagesThatSentToUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesThatSentToUser(req.params.uid)
            .then(messages => res.json(messages));

    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.body, req.params.uid, req.params.fuid)
            .then(status => res.send(status));

    userMessagesAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesAnotherUser(req.body, req.params.uid, req.params.fuid)
            .then(messages => res.json(messages));

};