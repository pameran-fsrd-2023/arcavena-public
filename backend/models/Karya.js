const { getDatabase } = require("../configs/MongoConnect");
const { ObjectId } = require("mongodb");
const generatePreview = require("../helpers/ImagePreview");
const getFilePath = require("../helpers/getFilePath");
const fs = require("fs").promises;

class Karya {
  constructor({ _id, title, prodi, imgUrl, dimensi, media, UserId, isHighLight, matkul, username, previewUrl, createdAt }) {
    Object.assign(this, {
      _id,
      title,
      prodi,
      dimensi,
      media,
      imgUrl,
      UserId,
      isHighLight,
      matkul,
      username,
      previewUrl,

      createdAt,
    });
  }

  static async collection() {
    return (await getDatabase()).collection("karyas");
  }

  static async findOne({ _id }) {
    try {
      const collection = await Karya.collection();
      return collection.findOne({ _id: new ObjectId(_id) });
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const collection = await Karya.collection();
      return collection.find().toArray();
    } catch (error) {
      throw error;
    }
  }

  static async findAllRandom({ prodi, username }) {
    try {
      const collection = await this.collection();
      const matchConditions = { imgUrl: { $ne: "" }, isHighLight: true };

      if (prodi) {
        matchConditions.prodi = prodi;
      }
      if (username) {
        matchConditions.username = { $regex: username, $options: "i" }; // Case-insensitive regex match
      }

      return collection
        .aggregate([
          { $match: matchConditions }, // Filter documents with imgUrl not empty, isHighlight = true, and optional prodi
          { $sample: { size: 24 } }, // Randomly sample 30 documents
        ])
        .toArray();
    } catch (error) {
      throw error;
    }
  }

  static async create({ title, prodi, imgUrl, dimensi, media, UserId, isHighLight, matkul, username, previewUrl }) {
    try {
      if (!previewUrl && isHighLight && imgUrl) {
        previewUrl = await generatePreview(getFilePath(imgUrl));
      }
      const collection = await Karya.collection();
      return collection.insertOne({
        title,
        prodi,
        imgUrl,
        UserId,
        dimensi,
        media,
        isHighLight,
        matkul,
        username,
        previewUrl,

        createdAt: new Date(),
      });
    } catch (error) {
      throw error;
    }
  }

  static async update({ _id, title, prodi, imgUrl, dimensi, media, UserId, isHighLight, matkul, username, previewUrl }) {
    try {
      if (!previewUrl && isHighLight && imgUrl) {
        previewUrl = await generatePreview(getFilePath(imgUrl));
      }
      const collection = await Karya.collection();
      const res = await collection.updateOne(
        { _id: new ObjectId(_id) },
        {
          $set: {
            title,
            prodi,
            dimensi,
            media,
            imgUrl,
            UserId,
            isHighLight,
            username,
            matkul,
            previewUrl,
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
      const collection = await Karya.collection();
      const karya = await Karya.findOne({ _id: new ObjectId(_id) });
      if (karya) {
        const oldImageFile = getFilePath(karya.imgUrl);
        const oldImagePreviewFile = getFilePath(karya.previewUrl);

        if (oldImageFile) {
          await fs.unlink(oldImageFile).catch((err) => {
            console.error(`Error deleting file: ${oldImageFile}`, err);
          });
        }
        if (oldImagePreviewFile) {
          await fs.unlink(oldImagePreviewFile).catch((err) => {
            console.error(`Error deleting file: ${oldImagePreviewFile}`, err);
          });
        }
      }
      const res = await collection.deleteOne({ _id: new ObjectId(_id) });

      return res;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Karya;
