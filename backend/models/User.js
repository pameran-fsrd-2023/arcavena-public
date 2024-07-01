const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/MongoConnect");
const { CustomError } = require("../middlewares/ErrorHandler");
const { getHashedString } = require("../helpers/bcrypt");

class User {
  constructor({
    _id,
    nim,
    username,
    displayName,
    password,

    capturedArea,

    profilePicUrl,

    createdAt,
    lastOnline,
  }) {
    Object.assign(this, {
      _id,
      nim,
      username,
      displayName,
      password,

      capturedArea,

      profilePicUrl,

      createdAt: createdAt?.toISOString().slice(0, 10),
      lastOnline: lastOnline?.toISOString().slice(0, 10),
    });
  }

  static async collection() {
    return (await getDatabase()).collection("users");
  }

  static async findOne({ username, _id, microsoftMail, googleMail }) {
    try {
      const collection = await User.collection();
      if (_id) return collection.findOne({ _id: new ObjectId(_id) });
      if (microsoftMail) return collection.findOne({ microsoftMail });
      if (googleMail) return collection.findOne({ googleMail });

      return collection.findOne({ username });
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const collection = await User.collection();

      const users = (
        await collection
          .find({
            projection: {
              password: 0,
              microsoftMail: 0,
              hashedMicrosoftMailId: 0,
              googleMail: 0,
              hashedGoogleMailId: 0,
            },
          })
          .toArray()
      ).map((user) => new User(user));

      return users;
    } catch (error) {
      throw error;
    }
  }

  static async register({ username, displayName, password, microsoftMail, microsoftMailId, googleMail, googleMailId }) {
    try {
      if (!displayName) {
        throw new CustomError(400, "Invalid POST Request field");
      }
      const collection = await User.collection();

      const createdAt = new Date();
      const lastOnline = new Date();

      if (password) {
        password = getHashedString(password);
        return await collection.insertOne({ username, displayName, password, createdAt, lastOnline });
      }

      if (microsoftMail) {
        const nim = microsoftMail.split("@")[0];
        microsoftMailId = getHashedString(microsoftMailId);
        return await collection.insertOne({ nim, displayName, microsoftMail, microsoftMailId, createdAt, lastOnline });
      }

      if (googleMail) {
        googleMailId = getHashedString(googleMailId);
        return await collection.insertOne({ displayName, googleMail, googleMailId, createdAt, lastOnline });
      }

      throw new CustomError(400, "Invalid POST Request field");
    } catch (error) {
      throw error;
    }
  }

  static async patchOnline({ _id }) {
    try {
      const collection = await User.collection();
      const lastOnline = new Date();
      const res = await collection.updateOne({ _id: new ObjectId(_id) }, { $set: { lastOnline } });

      return res;
    } catch (error) {
      throw error;
    }
  }

  static async update({ _id, displayName, password, profilePicUrl, capturedArea }) {
    try {
      const collection = await User.collection();
      const res = await collection.updateOne(
        { _id: new ObjectId(_id) },
        {
          $set: {
            displayName,
            password: getHashedString(password),
            profilePicUrl,
            karya1Id,
            karya2Id,
            karya3Id,
            karya4Id,
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
      const collection = await User.collection();
      const res = await collection.deleteOne({ _id: new ObjectId(_id) });

      return res;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = User;
