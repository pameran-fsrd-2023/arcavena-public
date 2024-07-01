//./scripts/addPreviewImage

const Karya = require("../../models/Karya");
const fs = require("fs");
const generatePreview = require("../../helpers/ImagePreview");
const getFilePath = require("../../helpers/getFilePath");

const addPreviewImage = async () => {
  try {
    const karyas = await Karya.findAll();

    for (let karya of karyas) {
      if (!karya.isHighLight || !karya.imgUrl) {
        continue;
      }
      console.log("updating", karya._id.toString());

      const karyaLoc = getFilePath(karya.imgUrl);

      // Check if the file exists
      if (fs.existsSync(karyaLoc)) {
        const previewUrl = await generatePreview(karyaLoc);
        karya.previewUrl = previewUrl;

        // Update the record with the new preview URL
        await Karya.update(karya);
      } else {
        console.error(`File not found: ${karyaLoc}`);
      }
    }
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = addPreviewImage;
