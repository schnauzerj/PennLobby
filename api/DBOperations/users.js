module.exports.getUsers = async (collection) => {
  console.log("jere");
  try {
    const users = await collection.find({});
    return users;
  } catch (err) {
    throw new Error(`Error getting all the users: ${err.message}`);
  }
};

module.exports.getUserByEmail = async (collection, theEmail) => {
  try {
    const user = await collection.findOne({ email: theEmail });
    return user;
  } catch (err) {
    throw new Error(`Error getting the user by email: ${err.message}`);
  }
};

// this checks if the user already exists in the database
module.exports.getUserByUsername = async (collection, Username) => {
  try {
    const user = await collection.findOne({ username: Username });
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error(`Error getting the user by email: ${err.message}`);
  }
};

module.exports.getUserById = async (collection, ID) => {
  try {
    const user = await collection.findOne({ id: ID });
    return user;
  } catch (err) {
    throw new Error(`Error getting the user by email: ${err.message}`);
  }
};

module.exports.addUser = async (collection, userObject) => {
  try {
    const result = await collection.create(userObject);
    return result;
  } catch (err) {
    throw new Error(`Error adding the user: ${err.message}`);
  }
};

module.exports.deleteUserById = async (collection, ID) => {
  try {
    const user = await collection.deleteOne({ id: ID });
    return user;
  } catch (err) {
    throw new Error(`Error deleting the user by id: ${err.message}`);
  }
};

module.exports.updateUserById = async (collection, ID, updatedObject) => {
  try {
    const response = await collection.updateOne(
      { _id: ID },
      { $set: updatedObject }
    );
    // { returnNewDocument : true })
    return response;
  } catch (err) {
    throw new Error(`Error updating the user by id: ${err.message}`);
  }
};