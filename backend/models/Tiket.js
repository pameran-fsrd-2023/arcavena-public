const { getDatabase } = require("../configs/MongoConnect");
const { ObjectId } = require("mongodb");

class Ticket {
  constructor({ _id, UserId, jumlahPengunjung, pengunjungs, sesiDay1, sesiDay2, createdAt }) {
    Object.assign(this, {
      _id,
      UserId,
      jumlahPengunjung,
      pengunjungs,

      sesiDay1,
      sesiDay2,
      createdAt,
    });
  }

  static async collection() {
    return (await getDatabase()).collection("tickets");
  }

  static async findOne({ _id, UserId }) {
    try {
      const collection = await Ticket.collection();
      if (UserId) return collection.findOne({ UserId: new ObjectId(UserId) });
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

  static async findAllByUserId(UserId) {
    try {
      const collection = await Ticket.collection();
      return collection.find({ UserId }).toArray();
    } catch (error) {
      throw error;
    }
  }

  static async create({ UserId, jumlahPengunjung, pengunjungs, sesiDay1, sesiDay2 }) {
    try {
      const collection = await Ticket.collection();
      return collection.insertOne({
        UserId,
        jumlahPengunjung,
        pengunjungs,

        sesiDay1,
        sesiDay2,
        createdAt: new Date(),
      });
    } catch (error) {
      throw error;
    }
  }

  static async update(_id, { jumlahPengunjung, pengunjungs, sesiDay1, sesiDay2 }) {
    try {
      const collection = await Ticket.collection();
      const res = await collection.updateOne(
        { _id: new ObjectId(_id) },
        {
          $set: {
            jumlahPengunjung,
            pengunjungs,

            sesiDay1,
            sesiDay2,
          },
        }
      );

      return res;
    } catch (error) {
      throw error;
    }
  }

  static async delete({ _id, UserId }) {
    try {
      const collection = await Ticket.collection();
      if (UserId) return collection.deleteOne({ UserId: new ObjectId(UserId) });

      return collection.deleteOne({ _id: new ObjectId(_id) });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Ticket;
