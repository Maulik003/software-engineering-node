/**
 * @file Controller RESTful Web service API for messages resource
 */
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/messages/:fuid to create a new message instance for
 *     a given users</li>
 *     <li>GET /api/tuits to retrieve all the tuit instances</li>
 *     <li>GET /api/users/:uid/messages/sent to retrieve all messages sent by the user</li>
 *     <li>GET /api/users/:uid/messages/received to retrieve all messages received to user </li>
 *     <li>GET /api/users/:uid/messageSent/:date retrieve all messages sent on a particular date</li>
 *     <li>PUT /api/messages/:mid update message string </li>
 *     <li>DELETE /api/messages/:mid to remove a particular message instance</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/api/users/:uid/messages/sent", MessageController.messageController.findAllMessagesThatUserSent);
            app.get("/api/users/:uid/messages/received", MessageController.messageController.findAllMessagesThatSentToUser);
            app.get("/api/users/:uid/messageSent/:date", MessageController.messageController.findAllMessagesSentOnDate);
            app.put("/api/messages/:mid", MessageController.messageController.updateMessage);
            app.post("/api/users/:uid/messages/:fuid", MessageController.messageController.userMessagesAnotherUser);
            app.delete("/api/messages/:mid", MessageController.messageController.userDeletesMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {
    }

    /**
     * Retrieves all messages from the database that user has sent.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesThatUserSent = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesThatUserSent(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all messages from the database that user has received.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesThatSentToUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesThatSentToUser(req.params.uid)
            .then(messages => res.json(messages));


    /**
     * Retrieves all messages from the database that user has sent on a particular date.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesSentOnDate = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentOnDate(req.params.uid, req.params.date)
            .then(messages => res.json(messages));

    /**
     * Updates message instance in database.
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a tuit was successful or not
     */
    updateMessage = (req: Request, res: Response) =>
        MessageController.messageDao.updateMessage(req.body, req.params.mid)
            .then((status) => res.send(status));

    /**
     * Removes a message instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter mid identifying the primary key of the message to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a message was successful or not
     */
    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.params.mid)
            .then(status => res.send(status));

    /**
     * Creates a new message instance
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new message to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    userMessagesAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesAnotherUser(req.body, req.params.uid, req.params.fuid)
            .then(messages => res.json(messages));

};