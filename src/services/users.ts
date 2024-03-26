import { NotFoundError } from "../errors/ApiError";
import User, { UserDocument } from "../model/User";

// services: async function
// talk to database
// methods: find();
const getAllUsers = async (): Promise<UserDocument[]> => {
  // find: methods by mongoose
  try {
  return await User.find();
} catch (error) {
  throw new Error("Failed to fetch users from the database");
}
};

const createUser = async (User: UserDocument): Promise<UserDocument> => {
  try {
    return await User.save();
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

const updateUser = async (userId: string, userData: Partial<UserDocument>): Promise<UserDocument | null> => {
try {
  return await User.findByIdAndUpdate(userId, userData, { new: true });
} catch (error) {
  throw new NotFoundError();
}
};

const deleteUser = async (userId: string): Promise<boolean> => {
try {
  const deletedUser = await User.findByIdAndDelete(userId);
  return !!deletedUser;
} catch (error) {
  throw new NotFoundError();
}
};

const findUserByID = async (userId: string): Promise<UserDocument | null> => {
try {
  return await User.findById(userId);
} catch (error) {
  throw new NotFoundError();
}
};

// ANDREA
// const getUserByEmail = async (email: string): Promise<UserDocument> => {
//   const foundUser = await User.findOne({ email });
//   if (foundUser) {
//     return foundUser;
//   }
//   throw new NotFoundError("Cant find user with email");
// };

export default { getAllUsers, createUser, updateUser, deleteUser, findUserByID };
