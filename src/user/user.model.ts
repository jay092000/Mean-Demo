import { Schema, model } from "mongoose";
import { userInterface } from "../generalInterfaces/user.interfaces";
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roleId: { type: Number, enum: [1, 2], required: true, default: 2 },
  createdAt: { type: Number, default: Math.round(Date.now() / 1000), required: true },
  active: { type: Number, enum: [1, 0], required: true, default: 1 },
});
const usersModel = model("user", userSchema);
export class userModelClass {
  constructor() {}

  getListOfUsers() {
    return usersModel.find().exec();
  }

  getUserDetailsById(id: string) {
    return usersModel.findById(id).exec();
  }

  getUserDetailsByData(data: userInterface) {
    return usersModel.find(data).exec();
  }
  insertOneUser(data: userInterface) {
    return usersModel.create(data);
  }
}
