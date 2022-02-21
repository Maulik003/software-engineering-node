/**
 * @file Declares Controllers for Messages related api methods
 */
import {Request, Response} from "express";

export default interface MessageControllerI {
    findAllMessagesThatUserSent(req: Request, res: Response): void;

    findAllMessagesThatSentToUser(req: Request, res: Response): void;

    userDeletesMessage(req: Request, res: Response): void;

    userMessagesAnotherUser(req: Request, res: Response): void;
};