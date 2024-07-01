const FsrdUser = require("../models/FsrdUser");
const Karya = require("../models/Karya");

const addUsernameKarya = async () => {
  try {
    const karyas = await Karya.findAll();

    for (let karya of karyas) {
      const user = await FsrdUser.findOne({ _id: karya.UserId });
      karya.username = user?.displayName?.replace(/\s+/g, "-")?.toLowerCase();
      console.log(`updating ${karya?.title}`);
      await Karya.update(karya);
    }
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = addUsernameKarya;
