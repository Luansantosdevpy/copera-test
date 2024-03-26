import { Document } from 'mongoose';

export default interface ToDoInterface extends Document {
    body: string;
    completed?: boolean;
    completedAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
}