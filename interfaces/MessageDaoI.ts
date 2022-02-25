/**
 * @file Declares API for Messages related data access object methods
 */
import Message from "../models/messages/Message";

export default interface MessageDaoI {

    findAllMessagesThatUserSent(uid: string): Promise<Message[]>;

    findAllMessagesThatSentToUser(uid: string): Promise<Message[]>;

    findAllMessagesSentOnDate(uid: string, date: string): Promise<Message[]>;

    updateMessage(message: Message, mid: string): Promise<any>;

    userDeletesMessage(mid: string): Promise<any>;

    userMessagesAnotherUser(message: Message, uid: string, fuid: string): Promise<Message>;
};