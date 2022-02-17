import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {
    }

    findAllMessagesThatUserSent = async (uid: string): Promise<Message[]> =>
        MessageModel.find({from: uid})
            .populate("message")
            .exec();

    findAllMessagesThatSentToUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({to: uid})
            .populate("message")
            .exec();

    userDeletesMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});

    userMessagesAnotherUser = async (message: Message, uid: string, fuid: string): Promise<Message> =>
        MessageModel.create({...message, from: uid, to: fuid});

}