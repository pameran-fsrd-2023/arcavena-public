const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/MongoConnect");

class UserExplored {
  constructor({ _id, progress, UserId, lastUpdated }) {
    Object.assign(this, {
      _id,
      progress,
      UserId,
      lastUpdated,
    });
  }

  static async collection() {
    return (await getDatabase()).collection("user-exploreds");
  }

  // Create a new UserExplored record
  static async create({ progress, UserId }) {
    const collection = await UserExplored.collection();
    const newUserExplored = {
      progress,
      UserId,
      lastUpdated: new Date(),
    };
    const result = await collection.insertOne(newUserExplored);
    return new UserExplored({ _id: result.insertedId, ...newUserExplored });
  }

  // Read a UserExplored record by ID
  static async findById(id) {
    const collection = await UserExplored.collection();
    const userExplored = await collection.findOne({ _id: new ObjectId(id) });
    return userExplored ? new UserExplored(userExplored) : null;
  }

  // Read a UserExplored record by UserId
  static async findByUserId(UserId) {
    const collection = await UserExplored.collection();
    const userExplored = await collection.findOne({ UserId });
    return userExplored ? new UserExplored(userExplored) : null;
  }

  // Update a UserExplored record by ID
  static async updateById(id, { progress }) {
    const collection = await UserExplored.collection();
    const { locationA, locationB, locationC, locationD, locationE, locationF } = progress;
    progress = { locationA, locationB, locationC, locationD, locationE, locationF };

    const updateResult = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { progress, lastUpdated: new Date() } });
    if (updateResult.matchedCount === 0) {
      throw new Error(`No record found with ID: ${id}`);
    }
    const updatedUserExplored = await UserExplored.findById(id);
    return updatedUserExplored;
  }

  // Delete a UserExplored record by ID
  static async deleteById(id) {
    const collection = await UserExplored.collection();
    const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });
    if (deleteResult.deletedCount === 0) {
      throw new Error(`No record found with ID: ${id}`);
    }
    return true;
  }
}

module.exports = UserExplored;
