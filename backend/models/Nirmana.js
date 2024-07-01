const { getDatabase } = require("../configs/MongoConnect");
const { ObjectId } = require("mongodb");

class Nirmana {
  constructor({ _id, UserId, data }) {
    Object.assign(this, {
      _id,
      UserId,
      data,
    });
  }

  static async collection() {
    return (await getDatabase()).collection("nirmanas");
  }

  // Create
  static async create({ UserId, data }) {
    const collection = await Nirmana.collection();
    return await collection.insertOne({ UserId, data });
  }

  // Read
  static async getById(id) {
    const collection = await Nirmana.collection();
    const result = await collection.findOne({ _id: new ObjectId(id) });
    return result ? new Nirmana(result) : null;
  }

  static async getByUserId(userId) {
    const collection = await Nirmana.collection();
    const result = await collection.findOne({ UserId: userId });
    return result ? new Nirmana(result) : null;
  }

  static async getAll() {
    const collection = await Nirmana.collection();
    const result = await collection.find().toArray();
    return result.map((nirmana) => new Nirmana(nirmana));
  }

  // Update
  static async updateById(id, updateData) {
    const collection = await Nirmana.collection();
    const result = await collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updateData }, { returnOriginal: false });
    return result.value ? new Nirmana(result.value) : null;
  }

  // Delete
  static async deleteById(id) {
    const collection = await Nirmana.collection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  // Get One Random
  static async getOneRandom() {
    const collection = await Nirmana.collection();
    const result = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();
    return result.length > 0 ? new Nirmana(result[0]) : null;
  }
}

module.exports = Nirmana;
