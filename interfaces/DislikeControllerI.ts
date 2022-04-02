import {Request, Response} from "express";

export default interface DislikeControllerI {
    findAllUsersThatDisLikedTuit(req: Request, res: Response): void;

    findAllTuitsDisLikedByUser(req: Request, res: Response): void;

    userTogglesTuitDisLikes(req: Request, res: Response): void;
};