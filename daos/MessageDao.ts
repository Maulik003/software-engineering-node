/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */

import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {
    }

    /**
     * Uses MessageModel to retrieve all Messages documents that given user sent
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllMessagesThatUserSent = async (uid: string): Promise<Message[]> =>
        MessageModel.find({from: uid})
            .populate("message")
            .populate("to", "username")
            .populate("from", "username")
            .exec();

    /**
     * Uses MessageModel to retrieve all messages sent to given user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when messages is retrieved from the database
     */
    findAllMessagesThatSentToUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({to: uid})
            .populate("message")
            .populate("to", "username")
            .populate("from", "username")
            .exec();


    /**
     * Uses MessageModel to retrieve all messages user sent on a particular date
     * @param {string} uid User's primary key
     * @param {string} date Date
     * @returns Promise To be notified when messages is retrieved from the database
     */
    findAllMessagesSentOnDate = async (uid: string, date: string): Promise<Message[]> =>
        MessageModel.find({from: uid, sentOn: date})
            .populate("message")
            .populate("to", "username")
            .populate("from", "username")
            .exec();

    /**
     * Updates message instance into the database
     * @param {Message} message Instance to be inserted into the database
     * @param {string} uid User's primary key
     * @returns Promise To be notified when message is updated into the database
     */
    updateMessage = async (message: Message, mid: string): Promise<any> =>
        MessageModel.updateOne({_id: mid},
            {$set: message});

    /**
     * Removes message from the database.
     * @param {string} mid Primary key of message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    userDeletesMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});

    /**
     * Inserts message instance into the database
     * @param {Message} message Instance to be inserted into the database
     * @param {string} uid User's primary key
     * @param {string} fuid Other User's primary key
     * @returns Promise To be notified when message is inserted into the database
     */
    userMessagesAnotherUser = async (message: Message, uid: string, fuid: string): Promise<Message> =>
        MessageModel.create({...message, from: uid, to: fuid});

}