const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/MongoConnect");
const { CustomError } = require("../middlewares/ErrorHandler");
const { getHashedString } = require("../helpers/bcrypt");

class FsrdUser {
  constructor({
    _id,
    nim,
    displayName,

    prodi,
    socialMedia,

    profilePicUrl,

    karya1Id,
    karya2Id,
    karya3Id,
    karya4Id,
    karya5Id,

    capturedArea,

    createdAt,
    lastOnline,
  }) {
    Object.assign(this, {
      _id,
      nim,
      displayName,

      prodi,
      socialMedia,

      profilePicUrl,

      karya1Id,
      karya2Id,
      karya3Id,
      karya4Id,
      karya5Id,

      capturedArea,

      createdAt,
      lastOnline,
    });
  }

  static async collection() {
    return (await getDatabase()).collection("FSRDUsers");
  }

  static async findOne({ _id, microsoftMail, username }) {
    try {
      const collection = await FsrdUser.collection();
      if (_id) return collection.findOne({ _id: new ObjectId(_id) });
      if (username) return collection.findOne({ username });

      return collection.findOne({ microsoftMail });
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const collection = await FsrdUser.collection();

      const users = (await collection.find().toArray()).map((user) => new FsrdUser(user));

      return users;
    } catch (error) {
      throw error;
    }
  }

  static async register({ displayName, microsoftMail, microsoftMailId }) {
    try {
      if (!displayName) {
        throw new CustomError(400, "Invalid POST Request field");
      }
      const collection = await FsrdUser.collection();

      const createdAt = new Date();

      const nim = microsoftMail.split("@")[0];
      microsoftMailId = getHashedString(microsoftMailId);
      return await collection.insertOne({ nim, displayName, microsoftMail, microsoftMailId, createdAt, lastOnline: createdAt });
    } catch (error) {
      throw error;
    }
  }

  static async patchOnline({ _id }) {
    try {
      const collection = await FsrdUser.collection();
      const res = await collection.updateOne({ _id: new ObjectId(_id) }, { $set: { lastOnline: new Date() } });

      return res;
    } catch (error) {
      throw error;
    }
  }

  static async update({
    _id,
    displayName,
    prodi,
    socialMedia,
    profilePicUrl,
    karya1Id,
    karya2Id,
    karya3Id,
    karya4Id,
    karya5Id,
    capturedArea,
  }) {
    try {
      const collection = await FsrdUser.collection();
      const res = await collection.updateOne(
        { _id: new ObjectId(_id) },
        {
          $set: {
            displayName,
            prodi,
            socialMedia,
            profilePicUrl,
            karya1Id,
            karya2Id,
            karya3Id,
            karya4Id,
            karya5Id,
            capturedArea,
          },
        }
      );

      return res;
    } catch (error) {
      throw error;
    }
  }

  static async delete({ _id }) {
    try {
      const collection = await FsrdUser.collection();
      const res = await collection.deleteOne({ _id: new ObjectId(_id) });

      return res;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = FsrdUser;
