import User, { UserDocument } from "../model/User";

// services: async function
// talk to database
// methods: find();

const getAllUser = async (): Promise<UserDocument[]> => {
  // find: methods by mongoose
  try {
  return await User.find();
} catch (error) {
  throw new Error("Failed to fetch users from the database");
}
};

const createUser = async (userData: any): Promise<UserDocument> => {
try {
  return await User.create(userData);
} catch (error) {
  throw new Error("Failed to create a new user");
}
};

const updateUser = async (userId: string, userData: any): Promise<UserDocument | null> => {
try {
  return await User.findByIdAndUpdate(userId, userData, { new: true });
} catch (error) {
  throw new Error("Failed to update the user");
}
};

const deleteUser = async (userId: string): Promise<boolean> => {
try {
  const deletedUser = await User.findByIdAndDelete(userId);
  return !!deletedUser;
} catch (error) {
  throw new Error("Failed to delete the user");
}
};

const findUserByID = async (userId: string): Promise<UserDocument | null> => {
try {
  return await User.findById(userId);
} catch (error) {
  throw new Error("Failed to find the user by ID");
}
};

export default { getAllUser, createUser, updateUser, deleteUser, findUserByID };
