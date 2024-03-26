import { Schema, model } from 'mongoose';
import ToDoInterface from '../interfaces/modelInterfaces/toDoInterface';

const ToDoSchema: Schema = new Schema({
    body: { type: String, required: true },
    completed: { type: Boolean, required: true },
    completedAt: { type: Date },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

const ToDo = model<ToDoInterface>('ToDo', ToDoSchema);

export default ToDo;