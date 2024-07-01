const { getDatabase } = require("../configs/MongoConnect");

class Attendance {
  constructor({ _id, TicketId, namaPengunjung }) {
    Object.assign(this, {
      _id,
      TicketId,
      namaPengunjung,
    });
  }

  static async collection() {
    return (await getDatabase()).collection("attendances");
  }

  static async findOne({ TicketId, namaPengunjung }) {
    const collection = await Attendance.collection();
    const attendance = await collection.findOne({ TicketId, namaPengunjung });
    if (attendance) {
      return new Attendance(attendance);
    }
    return null;
  }

  static async create({ TicketId, namaPengunjung }) {
    const collection = await Attendance.collection();
    const result = await collection.insertOne({ TicketId, namaPengunjung });
    return new Attendance({ _id: result.insertedId, TicketId, namaPengunjung });
  }
}

module.exports = Attendance;
