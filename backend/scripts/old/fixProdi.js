const FsrdUser = require("../models/FsrdUser");
const Karya = require("../models/Karya");

const fixProdi = async () => {
  try {
    const karyas = await Karya.findAll();

    for (let karya of karyas) {
      const user = await FsrdUser.findOne({ _id: karya.UserId });
      if (karya && user && karya?.prodi !== user?.prodi) {
        karya.matkul = karya.prodi;
      }
      karya.prodi = user?.prodi?.replace(/\s+/g, "-")?.toLowerCase();
      console.log(`updating ${karya?.title}`);
      await Karya.update(karya);
    }
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = fixProdi;
