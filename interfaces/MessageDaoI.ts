/**
 * @file Declares API for Messages related data access object methods
 */
import Message from "../models/messages/Message";

export default interface MessageDaoI {

    findAllMessagesThatUserSent(uid: string): Promise<Message[]>;

    findAllMessagesThatSentToUser(uid: string): Promise<Message[]>;

    userDeletesMessage(mid: string): Promise<any>;

    userMessagesAnotherUser(message: Message, uid: string, fuid: string): Promise<Message>;
};